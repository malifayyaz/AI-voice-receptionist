const Groq = require('groq-sdk');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const logger = require('./logger');

// Model pipeline definition
const DEFAULT_PIPELINE = [
  { provider: 'groq', model: 'llama-3.3-70b-versatile' },
  { provider: 'groq', model: 'llama-3.1-70b-versatile' },
  { provider: 'groq', model: 'openai/gpt-oss-120b' },
  { provider: 'gemini', model: 'gemini-3.6-flash' },
  { provider: 'gemini', model: 'gemini-2.0-flash' }
];

const GRACEFUL_FALLBACK_TEXT = "I'm having trouble connecting right now, let me have someone call you back.";

/**
 * Determines if an error should trigger a fallback
 */
function shouldFallback(error) {
  if (!error) return false;

  const status = error.status || error.statusCode || (error.response && error.response.status);
  const errMsg = (error.message || '').toLowerCase();
  const errBody = JSON.stringify(error).toLowerCase();

  // Rate limit
  if (status === 429 || errMsg.includes('rate limit') || errMsg.includes('quota')) {
    return true;
  }

  // 5xx Server errors
  if (status >= 500 && status < 600) {
    return true;
  }

  // Model deprecated, decommissioned, not found, or bad request due to model name
  if (
    status === 400 ||
    status === 404 ||
    errMsg.includes('decommissioned') ||
    errMsg.includes('deprecated') ||
    errMsg.includes('model_not_found') ||
    errMsg.includes('not found') ||
    errBody.includes('decommissioned') ||
    errBody.includes('deprecated')
  ) {
    return true;
  }

  // Network / timeout errors
  if (
    errMsg.includes('econnreset') ||
    errMsg.includes('etimedout') ||
    errMsg.includes('timeout') ||
    errMsg.includes('fetch failed')
  ) {
    return true;
  }

  // Default: try fallback on any API execution failure to ensure voice caller never hangs up abruptly
  return true;
}

/**
 * Formats OpenAI messages for Google Gemini
 */
function convertOpenAiMessagesToGemini(messages = []) {
  let systemInstruction = '';
  const geminiContents = [];

  for (const msg of messages) {
    const role = msg.role;
    const textContent = typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content || '');

    if (role === 'system') {
      systemInstruction = systemInstruction ? `${systemInstruction}\n${textContent}` : textContent;
    } else if (role === 'user') {
      geminiContents.push({
        role: 'user',
        parts: [{ text: textContent }]
      });
    } else if (role === 'assistant') {
      geminiContents.push({
        role: 'model',
        parts: [{ text: textContent }]
      });
    }
  }

  // Gemini contents must not be empty. If only system message was provided, add a placeholder user query.
  if (geminiContents.length === 0) {
    geminiContents.push({
      role: 'user',
      parts: [{ text: 'Hello' }]
    });
  }

  // Merge consecutive messages with the same role (Gemini requires alternating roles)
  const mergedContents = [];
  for (const item of geminiContents) {
    if (mergedContents.length > 0 && mergedContents[mergedContents.length - 1].role === item.role) {
      mergedContents[mergedContents.length - 1].parts[0].text += `\n${item.parts[0].text}`;
    } else {
      mergedContents.push({
        role: item.role,
        parts: [{ text: item.parts[0].text }]
      });
    }
  }

  // Gemini requires the first content message to have role 'user'
  if (mergedContents.length > 0 && mergedContents[0].role !== 'user') {
    mergedContents.unshift({
      role: 'user',
      parts: [{ text: 'Please continue based on previous context.' }]
    });
  }

  return { systemInstruction, contents: mergedContents };
}

/**
 * Executes a chat completion via Groq
 */
async function callGroq({ model, messages, temperature, max_tokens, stream = false }) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not configured in environment variables.');
  }

  const groq = new Groq({ apiKey });

  const payload = {
    model,
    messages,
    temperature: temperature !== undefined ? temperature : 0.7,
    stream: !!stream
  };
  if (max_tokens) payload.max_tokens = max_tokens;

  return await groq.chat.completions.create(payload);
}

/**
 * Executes a chat completion via Gemini
 */
async function callGemini({ model, messages, temperature, max_tokens, stream = false }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in environment variables.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const { systemInstruction, contents } = convertOpenAiMessagesToGemini(messages);

  const modelOptions = {
    model: model || 'gemini-2.0-flash',
  };
  if (systemInstruction) {
    modelOptions.systemInstruction = systemInstruction;
  }
  if (temperature !== undefined) {
    modelOptions.generationConfig = {
      temperature,
      maxOutputTokens: max_tokens
    };
  }

  const generativeModel = genAI.getGenerativeModel(modelOptions);

  if (stream) {
    const result = await generativeModel.generateContentStream({ contents });
    return result.stream;
  } else {
    const result = await generativeModel.generateContent({ contents });
    const response = await result.response;
    const text = response.text();

    // Map Gemini response to standard OpenAI format
    return {
      id: `chatcmpl-gemini-${Date.now()}`,
      object: 'chat.completion',
      created: Math.floor(Date.now() / 1000),
      model: model || 'gemini-2.0-flash',
      choices: [
        {
          index: 0,
          message: {
            role: 'assistant',
            content: text
          },
          finish_reason: 'stop'
        }
      ],
      usage: {
        prompt_tokens: response.usageMetadata?.promptTokenCount || 0,
        completion_tokens: response.usageMetadata?.candidatesTokenCount || 0,
        total_tokens: response.usageMetadata?.totalTokenCount || 0
      }
    };
  }
}

/**
 * Handles non-streaming chat completions with fallback cascade
 */
async function handleChatCompletion(body, customPipeline = null) {
  const pipeline = customPipeline || DEFAULT_PIPELINE;
  const messages = body.messages || [];
  const temperature = body.temperature;
  const max_tokens = body.max_tokens;

  let lastError = null;
  let previousAttempts = [];

  for (let i = 0; i < pipeline.length; i++) {
    const target = pipeline[i];
    const startTime = Date.now();
    const fallbackFrom = previousAttempts.length > 0 ? previousAttempts.join(' -> ') : null;

    logger.info(`Attempting LLM call [${i + 1}/${pipeline.length}]: Provider=${target.provider}, Model=${target.model}${fallbackFrom ? ` (Fallback from ${fallbackFrom})` : ''}`);

    try {
      let response;
      if (target.provider === 'groq') {
        response = await callGroq({
          model: target.model,
          messages,
          temperature,
          max_tokens,
          stream: false
        });
      } else if (target.provider === 'gemini') {
        response = await callGemini({
          model: target.model,
          messages,
          temperature,
          max_tokens,
          stream: false
        });
      } else {
        throw new Error(`Unknown provider: ${target.provider}`);
      }

      const latencyMs = Date.now() - startTime;
      logger.logRouting({
        provider: target.provider,
        model: target.model,
        latencyMs,
        status: 'success',
        fallbackFrom
      });

      return {
        response,
        provider: target.provider,
        model: target.model,
        latencyMs,
        fallbackOccurred: previousAttempts.length > 0
      };
    } catch (err) {
      const latencyMs = Date.now() - startTime;
      lastError = err;
      previousAttempts.push(`${target.provider}:${target.model}`);

      logger.error(`Failed with [${target.provider} -> ${target.model}] (${latencyMs}ms): ${err.message}`);
      logger.logRouting({
        provider: target.provider,
        model: target.model,
        latencyMs,
        status: 'failed',
        fallbackFrom,
        error: err
      });

      if (!shouldFallback(err) && i < pipeline.length - 1) {
        logger.warn(`Error marked as non-recoverable, but attempting next fallback provider in chain.`);
      }
    }
  }

  // All models failed in chain: return graceful fallback OpenAI-compatible response
  logger.error(`All ${pipeline.length} LLM providers failed. Returning graceful voice assistant fallback message.`);

  const gracefulResponse = {
    id: `chatcmpl-fallback-${Date.now()}`,
    object: 'chat.completion',
    created: Math.floor(Date.now() / 1000),
    model: 'voice-fallback-system',
    choices: [
      {
        index: 0,
        message: {
          role: 'assistant',
          content: GRACEFUL_FALLBACK_TEXT
        },
        finish_reason: 'stop'
      }
    ],
    usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }
  };

  return {
    response: gracefulResponse,
    provider: 'fallback-system',
    model: 'voice-fallback-system',
    latencyMs: 0,
    fallbackOccurred: true,
    allFailed: true,
    lastError: lastError ? lastError.message : null
  };
}

/**
 * Handles streaming chat completions (SSE)
 */
async function handleChatStream(res, body, customPipeline = null) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const pipeline = customPipeline || DEFAULT_PIPELINE;
  const messages = body.messages || [];
  const temperature = body.temperature;
  const max_tokens = body.max_tokens;

  let streamStarted = false;
  let lastError = null;
  let previousAttempts = [];

  for (let i = 0; i < pipeline.length; i++) {
    const target = pipeline[i];
    const startTime = Date.now();
    const fallbackFrom = previousAttempts.length > 0 ? previousAttempts.join(' -> ') : null;

    logger.info(`Attempting Stream LLM [${i + 1}/${pipeline.length}]: Provider=${target.provider}, Model=${target.model}`);

    try {
      if (target.provider === 'groq') {
        const stream = await callGroq({
          model: target.model,
          messages,
          temperature,
          max_tokens,
          stream: true
        });

        for await (const chunk of stream) {
          streamStarted = true;
          res.write(`data: ${JSON.stringify(chunk)}\n\n`);
        }
        res.write('data: [DONE]\n\n');
        res.end();

        const latencyMs = Date.now() - startTime;
        logger.logRouting({
          provider: target.provider,
          model: target.model,
          latencyMs,
          status: 'success',
          fallbackFrom
        });
        return;
      } else if (target.provider === 'gemini') {
        const stream = await callGemini({
          model: target.model,
          messages,
          temperature,
          max_tokens,
          stream: true
        });

        const completionId = `chatcmpl-gemini-${Date.now()}`;
        for await (const chunk of stream) {
          const chunkText = chunk.text();
          if (chunkText) {
            streamStarted = true;
            const openAiChunk = {
              id: completionId,
              object: 'chat.completion.chunk',
              created: Math.floor(Date.now() / 1000),
              model: target.model,
              choices: [
                {
                  index: 0,
                  delta: { content: chunkText },
                  finish_reason: null
                }
              ]
            };
            res.write(`data: ${JSON.stringify(openAiChunk)}\n\n`);
          }
        }

        // Send final chunk with finish_reason
        const finalChunk = {
          id: completionId,
          object: 'chat.completion.chunk',
          created: Math.floor(Date.now() / 1000),
          model: target.model,
          choices: [
            {
              index: 0,
              delta: {},
              finish_reason: 'stop'
            }
          ]
        };
        res.write(`data: ${JSON.stringify(finalChunk)}\n\n`);
        res.write('data: [DONE]\n\n');
        res.end();

        const latencyMs = Date.now() - startTime;
        logger.logRouting({
          provider: target.provider,
          model: target.model,
          latencyMs,
          status: 'success',
          fallbackFrom
        });
        return;
      }
    } catch (err) {
      lastError = err;
      previousAttempts.push(`${target.provider}:${target.model}`);
      logger.error(`Stream error on [${target.provider} -> ${target.model}]: ${err.message}`);

      // If we already sent bytes to the client stream, we cannot restart stream from scratch cleanly
      if (streamStarted) {
        logger.error('Stream already started sending tokens to client; closing stream prematurely.');
        res.write('data: [DONE]\n\n');
        res.end();
        return;
      }
    }
  }

  // If all failed before sending any stream bytes, emit graceful assistant fallback tokens
  logger.error('All streaming LLM providers failed. Emitting graceful fallback stream.');
  const fallbackChunk = {
    id: `chatcmpl-fallback-${Date.now()}`,
    object: 'chat.completion.chunk',
    created: Math.floor(Date.now() / 1000),
    model: 'voice-fallback-system',
    choices: [
      {
        index: 0,
        delta: { content: GRACEFUL_FALLBACK_TEXT },
        finish_reason: null
      }
    ]
  };
  res.write(`data: ${JSON.stringify(fallbackChunk)}\n\n`);
  res.write('data: [DONE]\n\n');
  res.end();
}

module.exports = {
  DEFAULT_PIPELINE,
  GRACEFUL_FALLBACK_TEXT,
  handleChatCompletion,
  handleChatStream,
  convertOpenAiMessagesToGemini
};
