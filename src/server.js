require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bookingRoutes = require('./routes/bookingRoutes');
const chatRoutes = require('./routes/chatRoutes');
const logger = require('./services/logger');
const { getDoc } = require('./services/googleSheetsService');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} [${res.statusCode}] - ${duration}ms`);
  });
  next();
});

// Root & Health check routes
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'AI Voice Receptionist Backend',
    version: '1.0.0',
    endpoints: {
      booking: [
        'POST /check-availability',
        'POST /book-appointment',
        'GET /bookings'
      ],
      llm: [
        'POST /v1/chat/completions'
      ],
      health: 'GET /health'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    config: {
      groqConfigured: !!process.env.GROQ_API_KEY,
      geminiConfigured: !!process.env.GEMINI_API_KEY,
      googleSheetsConfigured: !!(process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_SHEET_ID)
    }
  });
});

// Mount routes
// Part A: Booking API directly on root routes (/check-availability, /book-appointment, /bookings)
app.use('/', bookingRoutes);

// Part B: LLM Fallback Router on /v1/chat/completions (OpenAI Compatible)
app.use('/v1', chatRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Endpoint ${req.method} ${req.url} does not exist.`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  logger.error('Unhandled server error:', err.stack || err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred.'
  });
});

// Start Server
if (require.main === module) {
  app.listen(PORT, async () => {
    logger.success(`🚀 Server running at http://localhost:${PORT}`);
    logger.info(`📋 Available Endpoints:`);
    logger.info(`   - POST http://localhost:${PORT}/check-availability`);
    logger.info(`   - POST http://localhost:${PORT}/book-appointment`);
    logger.info(`   - GET  http://localhost:${PORT}/bookings`);
    logger.info(`   - POST http://localhost:${PORT}/v1/chat/completions`);

    // Warm-up Google Sheets connection check
    if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_SHEET_ID) {
      await getDoc();
    }
  });
}

module.exports = app;
