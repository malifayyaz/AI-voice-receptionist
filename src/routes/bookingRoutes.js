const express = require('express');
const router = express.Router();
const bookingService = require('../services/bookingService');
const logger = require('../services/logger');

// POST /check-availability
router.post('/check-availability', (req, res) => {
  try {
    const { date, time } = req.body;
    if (!date || !time) {
      return res.status(400).json({
        error: 'Missing required parameters',
        message: 'Both "date" and "time" are required to check availability.'
      });
    }

    const available = bookingService.checkAvailability(date, time);
    logger.info(`Availability check for ${date} at ${time}: ${available ? 'AVAILABLE' : 'BOOKED'}`);

    return res.json({ available });
  } catch (error) {
    logger.error('Error in /check-availability:', error.message);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// POST /book-appointment
router.post('/book-appointment', async (req, res) => {
  try {
    const { name, date, time, reason } = req.body;

    if (!name || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: "name", "date", and "time" are required.'
      });
    }

    const result = await bookingService.bookAppointment({ name, date, time, reason });
    if (!result.success) {
      return res.status(409).json(result);
    }

    return res.status(201).json(result);
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
