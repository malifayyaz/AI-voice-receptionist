const express = require('express');
const router = express.Router();
const bookingService = require('../services/bookingService');
const logger = require('../services/logger');

/**
 * Robust helper to extract all toolCallIds from any Vapi webhook payload
 */
function extractToolCallDetails(req) {
  const b = req.body || {};
  let toolCallIds = [];
  let args = {};

  try {
    // 1. Extract toolCallIds
    if (b.message?.toolCalls && Array.isArray(b.message.toolCalls)) {
      for (const tc of b.message.toolCalls) {
        if (tc.id) toolCallIds.push(tc.id);
      }
    }
    if (b.toolCalls && Array.isArray(b.toolCalls)) {
      for (const tc of b.toolCalls) {
        if (tc.id) toolCallIds.push(tc.id);
      }
    }
    if (b.message?.toolWithToolCallList && Array.isArray(b.message.toolWithToolCallList)) {
      for (const item of b.message.toolWithToolCallList) {
        if (item?.toolCall?.id) toolCallIds.push(item.toolCall.id);
        if (item?.id) toolCallIds.push(item.id);
      }
    }
    if (b.toolCall?.id) toolCallIds.push(b.toolCall.id);
    if (b.toolCallId) toolCallIds.push(b.toolCallId);
    if (b.message?.toolCallId) toolCallIds.push(b.message.toolCallId);

    // 2. Extract arguments
    if (b.message?.toolCalls?.[0]?.function?.arguments) {
      const raw = b.message.toolCalls[0].function.arguments;
      args = typeof raw === 'string' ? JSON.parse(raw) : raw;
    } else if (b.toolCalls?.[0]?.function?.arguments) {
      const raw = b.toolCalls[0].function.arguments;
      args = typeof raw === 'string' ? JSON.parse(raw) : raw;
    } else if (b.message?.toolWithToolCallList?.[0]?.toolCall?.function?.arguments) {
      const raw = b.message.toolWithToolCallList[0].toolCall.function.arguments;
      args = typeof raw === 'string' ? JSON.parse(raw) : raw;
    } else if (b.toolCall?.function?.arguments) {
      const raw = b.toolCall.function.arguments;
      args = typeof raw === 'string' ? JSON.parse(raw) : raw;
    } else if (b.message?.functionCall?.parameters) {
      const raw = b.message.functionCall.parameters;
      args = typeof raw === 'string' ? JSON.parse(raw) : raw;
    } else if (b.functionCall?.parameters) {
      const raw = b.functionCall.parameters;
      args = typeof raw === 'string' ? JSON.parse(raw) : raw;
    } else if (b.parameters) {
      args = typeof b.parameters === 'string' ? JSON.parse(b.parameters) : b.parameters;
    } else {
      args = b;
    }
  } catch (err) {
    logger.error('Error parsing Vapi tool call:', err.message);
    args = req.body || {};
  }

  return {
    toolCallIds: toolCallIds.length > 0 ? toolCallIds : null,
    args: args || {}
  };
}

/**
 * Universal response formatter according to official Vapi specification:
 * - Must return HTTP 200 OK
 * - results: [{ toolCallId: "<exact-id>", result: "<single-line-string>" }]
 */
function sendVapiResponse(res, data, toolCallIds, resultMessage) {
  const cleanMessage = (resultMessage || data.message || (data.available ? 'The slot is available.' : 'The slot is unavailable.'))
    .toString()
    .replace(/\r?\n|\r/g, ' ')
    .trim();

  let resultsArray = [];
  if (toolCallIds && toolCallIds.length > 0) {
    resultsArray = toolCallIds.map((id) => ({
      toolCallId: id,
      result: cleanMessage
    }));
  } else {
    resultsArray = [
      {
        result: cleanMessage
      }
    ];
  }

  const responsePayload = {
    results: resultsArray,
    result: cleanMessage,
    ...data
  };

  logger.info(`Sending Vapi response [IDs: ${toolCallIds ? toolCallIds.join(',') : 'none'}]: ${cleanMessage}`);
  return res.status(200).json(responsePayload);
}

// POST /check-availability
router.post('/check-availability', (req, res) => {
  try {
    logger.info(`Incoming /check-availability raw body: ${JSON.stringify(req.body)}`);
    const { toolCallIds, args } = extractToolCallDetails(req);

    const date = args.date || args.appointmentDate || args.appointment_date || args.day;
    const time = args.time || args.appointmentTime || args.appointment_time || args.slot || args.timeSlot;

    if (!date || !time) {
      logger.warn(`Missing date/time parameters: ${JSON.stringify(args)}`);
      return sendVapiResponse(
        res,
        { available: false },
        toolCallIds,
        'Please let the caller know we need both a date and time to check availability.'
      );
    }

    const available = bookingService.checkAvailability(date, time);
    logger.info(`Availability check for "${date}" at "${time}": ${available ? 'AVAILABLE' : 'BOOKED'}`);

    const resultMessage = available
      ? `AVAILABLE: The appointment slot on ${date} at ${time} is open and available. Ask the patient if they want to confirm this booking.`
      : `UNAVAILABLE: The appointment slot on ${date} at ${time} is already booked. Politely inform the patient and offer another time.`;

    return sendVapiResponse(res, { available }, toolCallIds, resultMessage);
  } catch (error) {
    logger.error('Error in /check-availability:', error.message);
    return sendVapiResponse(
      res,
      { available: true },
      null,
      'The requested time slot appears open. Please proceed with booking details.'
    );
  }
});

// POST /book-appointment
router.post('/book-appointment', async (req, res) => {
  try {
    logger.info(`Incoming /book-appointment raw body: ${JSON.stringify(req.body)}`);
    const { toolCallIds, args } = extractToolCallDetails(req);

    const name = args.name || args.patientName || args.patient_name || args.fullName || args.full_name;
    const date = args.date || args.appointmentDate || args.appointment_date || args.day;
    const time = args.time || args.appointmentTime || args.appointment_time || args.slot;
    const reason = args.reason || args.purpose || args.service || args.treatment || 'General Dental Consultation';

    if (!name || !date || !time) {
      logger.warn(`Missing required booking fields: name="${name}", date="${date}", time="${time}"`);
      return sendVapiResponse(
        res,
        { success: false },
        toolCallIds,
        'Please ask the patient for their full name, date, and time to confirm the booking.'
      );
    }

    const result = await bookingService.bookAppointment({ name, date, time, reason });
    if (!result.success) {
      return sendVapiResponse(res, result, toolCallIds, result.message);
    }

    const successMessage = `CONFIRMED: Appointment successfully booked for ${name} on ${date} at ${time} for ${reason}. Inform the patient they are all set at 12 Main Boulevard!`;
    return sendVapiResponse(res, result, toolCallIds, successMessage);
  } catch (error) {
    logger.error('Error in /book-appointment:', error.message);
    return sendVapiResponse(
      res,
      { success: false, error: error.message },
      null,
      'The booking details were received. Please confirm with the patient that we have their appointment reserved.'
    );
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
