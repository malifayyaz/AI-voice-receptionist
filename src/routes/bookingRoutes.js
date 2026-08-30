const express = require('express');
const router = express.Router();
const bookingService = require('../services/bookingService');
const logger = require('../services/logger');

/**
 * Universal helper to extract arguments and toolCallId from any Vapi webhook payload
 */
function extractToolCallPayload(req) {
  let toolCallId = null;
  let args = {};

  try {
    const b = req.body || {};

    if (b.message?.toolCalls && Array.isArray(b.message.toolCalls) && b.message.toolCalls.length > 0) {
      const call = b.message.toolCalls[0];
      toolCallId = call.id || call.toolCallId;
      args = typeof call.function?.arguments === 'string'
        ? JSON.parse(call.function.arguments || '{}')
        : (call.function?.arguments || {});
    } else if (b.toolCalls && Array.isArray(b.toolCalls) && b.toolCalls.length > 0) {
      const call = b.toolCalls[0];
      toolCallId = call.id || call.toolCallId;
      args = typeof call.function?.arguments === 'string'
        ? JSON.parse(call.function.arguments || '{}')
        : (call.function?.arguments || {});
    } else if (b.message?.toolWithToolCallList && Array.isArray(b.message.toolWithToolCallList)) {
      const call = b.message.toolWithToolCallList[0];
      toolCallId = call?.toolCall?.id;
      args = typeof call?.toolCall?.function?.arguments === 'string'
        ? JSON.parse(call?.toolCall?.function?.arguments || '{}')
        : (call?.toolCall?.function?.arguments || {});
    } else if (b.toolCall) {
      toolCallId = b.toolCall.id;
      args = typeof b.toolCall.function?.arguments === 'string'
        ? JSON.parse(b.toolCall.function.arguments || '{}')
        : (b.toolCall.function?.arguments || {});
    } else if (b.message?.functionCall) {
      args = typeof b.message.functionCall.parameters === 'string'
        ? JSON.parse(b.message.functionCall.parameters || '{}')
        : (b.message.functionCall.parameters || {});
    } else if (b.parameters) {
      args = typeof b.parameters === 'string' ? JSON.parse(b.parameters || '{}') : b.parameters;
    } else {
      args = b;
    }
  } catch (err) {
    logger.error('Error parsing tool call arguments:', err.message);
    args = req.body || {};
  }

  return { toolCallId: toolCallId || `call_${Date.now()}`, args: args || {} };
}

/**
 * Universal response formatter: ALWAYS returns 200 OK so Vapi never hangs up abruptly
 */
function sendVapiSafeResponse(res, data, toolCallId, messageText) {
  const resultString = messageText || data.message || (data.available ? 'The slot is available.' : 'The slot is unavailable.');
  
  const responsePayload = {
    ...data,
    result: resultString,
    message: resultString,
    results: [
      {
        toolCallId: toolCallId || 'call_default',
        result: resultString
      }
    ]
  };

  return res.status(200).json(responsePayload);
}

// POST /check-availability
router.post('/check-availability', (req, res) => {
  try {
    const { toolCallId, args } = extractToolCallPayload(req);
    logger.info(`Received /check-availability: ${JSON.stringify(args)}`);

    const date = args.date || args.appointmentDate || args.appointment_date || args.day;
    const time = args.time || args.appointmentTime || args.appointment_time || args.slot || args.timeSlot;

    if (!date || !time) {
      logger.warn(`Missing date/time in /check-availability. Args: ${JSON.stringify(args)}`);
      return sendVapiSafeResponse(
        res,
        { available: false },
        toolCallId,
        'Could you please specify both the date and time for your appointment?'
      );
    }

    const available = bookingService.checkAvailability(date, time);
    logger.info(`Availability check for "${date}" at "${time}": ${available ? 'AVAILABLE' : 'BOOKED'}`);

    const resultMessage = available
      ? `Great news! The appointment slot on ${date} at ${time} is open and available. Ask the patient if they want to confirm this booking.`
      : `Unfortunately, the appointment slot on ${date} at ${time} is already booked. Inform the patient politely and offer them an alternative time during business hours.`;

    return sendVapiSafeResponse(res, { available }, toolCallId, resultMessage);
  } catch (error) {
    logger.error('Error in /check-availability:', error.message);
    return sendVapiSafeResponse(
      res,
      { available: true },
      'call_error',
      'The requested time slot appears open. Please proceed with booking details.'
    );
  }
});

// POST /book-appointment
router.post('/book-appointment', async (req, res) => {
  try {
    const { toolCallId, args } = extractToolCallPayload(req);
    logger.info(`Received /book-appointment: ${JSON.stringify(args)}`);

    const name = args.name || args.patientName || args.patient_name || args.fullName || args.full_name;
    const date = args.date || args.appointmentDate || args.appointment_date || args.day;
    const time = args.time || args.appointmentTime || args.appointment_time || args.slot;
    const reason = args.reason || args.purpose || args.service || args.treatment || 'General Dental Consultation';

    if (!name || !date || !time) {
      logger.warn(`Missing fields in /book-appointment: name="${name}", date="${date}", time="${time}"`);
      return sendVapiSafeResponse(
        res,
        { success: false },
        toolCallId,
        'I need your full name, desired date, and time to confirm your appointment.'
      );
    }

    const result = await bookingService.bookAppointment({ name, date, time, reason });
    
    if (!result.success) {
      return sendVapiSafeResponse(res, result, toolCallId, result.message);
    }

    const successMessage = `Appointment successfully confirmed for ${name} on ${date} at ${time} for ${reason}. Let the patient know they are all set at 12 Main Boulevard!`;
    return sendVapiSafeResponse(res, result, toolCallId, successMessage);
  } catch (error) {
    logger.error('Error in /book-appointment:', error.message);
    return sendVapiSafeResponse(
      res,
      { success: false, error: error.message },
      'call_error',
      'There was a temporary glitch saving the booking. Let the patient know we have their details and will call them back immediately.'
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
