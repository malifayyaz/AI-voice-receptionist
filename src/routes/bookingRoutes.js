const express = require('express');
const router = express.Router();
const bookingService = require('../services/bookingService');
const logger = require('../services/logger');

/**
 * Universal helper to extract arguments from both direct REST calls and Vapi webhook tool calls
 */
function extractToolCallPayload(req) {
  let toolCallId = null;
  let args = {};

  try {
    if (req.body?.message?.toolCalls && Array.isArray(req.body.message.toolCalls) && req.body.message.toolCalls.length > 0) {
      const call = req.body.message.toolCalls[0];
      toolCallId = call.id;
      args = typeof call.function?.arguments === 'string'
        ? JSON.parse(call.function.arguments || '{}')
        : (call.function?.arguments || {});
    } else if (req.body?.message?.toolWithToolCallList && Array.isArray(req.body.message.toolWithToolCallList)) {
      const call = req.body.message.toolWithToolCallList[0];
      toolCallId = call?.toolCall?.id;
      args = typeof call?.toolCall?.function?.arguments === 'string'
        ? JSON.parse(call?.toolCall?.function?.arguments || '{}')
        : (call?.toolCall?.function?.arguments || {});
    } else if (req.body?.message?.functionCall) {
      args = typeof req.body.message.functionCall.parameters === 'string'
        ? JSON.parse(req.body.message.functionCall.parameters || '{}')
        : (req.body.message.functionCall.parameters || {});
    } else if (req.body?.toolCall) {
      toolCallId = req.body.toolCall.id;
      args = typeof req.body.toolCall.function?.arguments === 'string'
        ? JSON.parse(req.body.toolCall.function.arguments || '{}')
        : (req.body.toolCall.function?.arguments || {});
    } else if (req.body?.parameters) {
      args = typeof req.body.parameters === 'string' ? JSON.parse(req.body.parameters || '{}') : req.body.parameters;
    } else {
      args = req.body || {};
    }
  } catch (err) {
    logger.error('Error parsing tool call arguments:', err.message);
    args = req.body || {};
  }

  return { toolCallId, args };
}

/**
 * Helper to format response for both Vapi and direct HTTP callers
 */
function sendFormattedResponse(res, statusCode, data, toolCallId, resultMessage) {
  const messageText = resultMessage || data.message || (data.available ? 'The slot is available.' : 'The slot is already booked.');
  const responsePayload = {
    ...data,
    result: messageText
  };

  if (toolCallId) {
    responsePayload.results = [
      {
        toolCallId: toolCallId,
        result: messageText
      }
    ];
  }

  return res.status(statusCode).json(responsePayload);
}

// POST /check-availability
router.post('/check-availability', (req, res) => {
  try {
    const { toolCallId, args } = extractToolCallPayload(req);
    logger.info(`Received /check-availability payload: ${JSON.stringify(args)}`);

    const date = args.date;
    const time = args.time;

    if (!date || !time) {
      return sendFormattedResponse(
        res,
        400,
        { error: 'Missing required parameters', message: 'Both "date" and "time" are required.' },
        toolCallId,
        'Please provide both a date and time to check availability.'
      );
    }

    const available = bookingService.checkAvailability(date, time);
    logger.info(`Availability check for ${date} at ${time}: ${available ? 'AVAILABLE' : 'BOOKED'}`);

    const resultMessage = available
      ? `AVAILABLE: The appointment slot on ${date} at ${time} is open and ready to book.`
      : `UNAVAILABLE: The appointment slot on ${date} at ${time} is already booked by another patient. Inform the caller politely and ask if an alternative time or date works for them.`;

    return sendFormattedResponse(res, 200, { available }, toolCallId, resultMessage);
  } catch (error) {
    logger.error('Error in /check-availability:', error.message);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// POST /book-appointment
router.post('/book-appointment', async (req, res) => {
  try {
    const { toolCallId, args } = extractToolCallPayload(req);
    logger.info(`Received /book-appointment payload: ${JSON.stringify(args)}`);

    const name = args.name;
    const date = args.date;
    const time = args.time;
    const reason = args.reason || args.purpose || args.service || 'General Dental Consultation';

    if (!name || !date || !time) {
      logger.warn(`Missing fields in /book-appointment: name="${name}", date="${date}", time="${time}"`);
      return sendFormattedResponse(
        res,
        400,
        { success: false, message: 'Missing required fields: name, date, and time.' },
        toolCallId,
        'I need the patient full name, appointment date, and time to complete the booking.'
      );
    }

    const result = await bookingService.bookAppointment({ name, date, time, reason });
    if (!result.success) {
      return sendFormattedResponse(res, 409, result, toolCallId, result.message);
    }

    const successMessage = `Appointment confirmed for ${name} on ${date} at ${time} for ${reason}.`;
    return sendFormattedResponse(res, 201, result, toolCallId, successMessage);
  } catch (error) {
    logger.error('Error in /book-appointment:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to complete booking',
      error: error.message
    });
  }
});

// GET /bookings
router.get('/bookings', (req, res) => {
  try {
    const bookings = bookingService.getBookings();
    return res.json(bookings);
  } catch (error) {
    logger.error('Error in /bookings:', error.message);
    return res.status(500).json({ error: 'Failed to fetch bookings', message: error.message });
  }
});

module.exports = router;
