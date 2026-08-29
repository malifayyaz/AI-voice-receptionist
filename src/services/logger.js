const fs = require('fs');
const path = require('path');

const LOGS_DIR = path.join(__dirname, '../../logs');

// Ensure logs directory exists
if (!fs.existsSync(LOGS_DIR)) {
  try {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
  } catch (err) {
    console.error('Failed to create logs directory:', err.message);
  }
}

const LOG_FILE = path.join(LOGS_DIR, 'router.log');

function formatTimestamp() {
  return new Date().toISOString();
}

function writeToFile(level, message, meta = null) {
  try {
    const metaStr = meta ? ` | ${JSON.stringify(meta)}` : '';
    const logLine = `[${formatTimestamp()}] [${level.toUpperCase()}] ${message}${metaStr}\n`;
    fs.appendFileSync(LOG_FILE, logLine, 'utf8');
  } catch (err) {
    console.error('Failed writing to log file:', err.message);
  }
}

const logger = {
  info: (msg, meta) => {
    console.log(`\x1b[36m[${formatTimestamp()}] [INFO]\x1b[0m ${msg}`, meta ? meta : '');
    writeToFile('INFO', msg, meta);
  },
  warn: (msg, meta) => {
    console.warn(`\x1b[33m[${formatTimestamp()}] [WARN]\x1b[0m ${msg}`, meta ? meta : '');
    writeToFile('WARN', msg, meta);
  },
  error: (msg, meta) => {
    console.error(`\x1b[31m[${formatTimestamp()}] [ERROR]\x1b[0m ${msg}`, meta ? meta : '');
    writeToFile('ERROR', msg, meta);
  },
  success: (msg, meta) => {
    console.log(`\x1b[32m[${formatTimestamp()}] [SUCCESS]\x1b[0m ${msg}`, meta ? meta : '');
    writeToFile('SUCCESS', msg, meta);
  },
  logRouting: ({ provider, model, latencyMs, status, fallbackFrom = null, error = null }) => {
    const statusColor = status === 'success' ? '\x1b[32m' : '\x1b[31m';
    const fallbackText = fallbackFrom ? ` (Fallback from: ${fallbackFrom})` : '';
    const summary = `LLM Request Handled By [${provider} -> ${model}] - Status: ${statusColor}${status.toUpperCase()}\x1b[0m (${latencyMs}ms)${fallbackText}`;
    console.log(`[${formatTimestamp()}] ${summary}`);
    writeToFile(status === 'success' ? 'ROUTER_SUCCESS' : 'ROUTER_FALLBACK', summary, {
      provider,
      model,
      latencyMs,
      status,
      fallbackFrom,
      error: error ? (error.message || error) : null
    });
  }
};

module.exports = logger;
