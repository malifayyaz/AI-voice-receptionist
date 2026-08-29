const express = require('express');
const router = express.Router();
const { handleChatCompletion, handleChatStream } = require('../services/llmRouter');
const logger = require('../services/logger');

// POST /v1/chat/completions
router.post('/chat/completions', async (req, res) => {
  try {
    const { messages, stream, model } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: {
          message: 'Invalid request: "messages" array is required.',
          type: 'invalid_request_error',
          code: 'missing_required_parameter'
        }
      });
    }

    // Support simulation / test pipelines via header or body (useful for test scripts)
    let customPipeline = null;
    if (req.headers['x-custom-pipeline']) {
      try {
        customPipeline = JSON.parse(req.headers['x-custom-pipeline']);
      } catch (e) {
        logger.warn('Failed parsing x-custom-pipeline header:', e.message);
      }
    } else if (req.body._pipeline && Array.isArray(req.body._pipeline)) {
      customPipeline = req.body._pipeline;
    }

    if (stream) {
      return await handleChatStream(res, req.body, customPipeline);
    }

    const outcome = await handleChatCompletion(req.body, customPipeline);

    res.setHeader('x-llm-provider', outcome.provider);
    res.setHeader('x-llm-model', outcome.model);
    res.setHeader('x-fallback-occurred', outcome.fallbackOccurred ? 'true' : 'false');

    return res.json(outcome.response);
  } catch (error) {
    logger.error('Unexpected error in /v1/chat/completions endpoint:', error.message);
    return res.status(500).json({
      error: {
        message: 'Internal server error processing chat completion.',
        type: 'api_error',
        code: 'internal_error'
      }
    });
  }
});

module.exports = router;
