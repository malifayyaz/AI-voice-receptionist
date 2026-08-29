const fs = require('fs');
const path = require('path');
const logger = require('./logger');
const { appendBookingToSheet } = require('./googleSheetsService');

const BOOKINGS_FILE = path.join(__dirname, '../../bookings.json');

// Helper to ensure bookings.json exists
function ensureFileExists() {
  if (!fs.existsSync(BOOKINGS_FILE)) {
    try {
      fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([], null, 2), 'utf8');
    } catch (err) {
      logger.error('Failed to initialize bookings.json file:', err.message);
    }
  }
}

// Read all bookings
function getBookings() {
  ensureFileExists();
  try {
    const raw = fs.readFileSync(BOOKINGS_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    logger.error('Failed to read bookings.json:', err.message);
    return [];
  }
}

// Write bookings array
function saveBookings(bookings) {
  try {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), 'utf8');
    return true;
  } catch (err) {
    logger.error('Failed to write to bookings.json:', err.message);
    return false;
  }
}

// Normalize date/time for robust matching
function normalizeDateTime(date, time) {
  const normDate = (date || '').trim().toLowerCase();
  const normTime = (time || '').trim().toLowerCase();
  return { normDate, normTime };
}

/**
 * Checks if a specific date and time slot is available
 * @param {string} date
 * @param {string} time
 * @returns {boolean}
 */
function checkAvailability(date, time) {
  if (!date || !time) {
    return false;
  }
  const bookings = getBookings();
  const { normDate, normTime } = normalizeDateTime(date, time);

  const isTaken = bookings.some(b => {
    const bNorm = normalizeDateTime(b.date, b.time);
    return bNorm.normDate === normDate && bNorm.normTime === normTime;
  });

  return !isTaken;
}

/**
 * Books an appointment and syncs with Google Sheets
 * @param {Object} data { name, date, time, reason }
 * @returns {Object} result
 */
async function bookAppointment({ name, date, time, reason }) {
  if (!name || !date || !time) {
    throw new Error('Name, date, and time are required fields.');
  }

  const isAvailable = checkAvailability(date, time);
  if (!isAvailable) {
    return {
      success: false,
      message: `The slot on ${date} at ${time} is already booked. Please choose another time.`
    };
  }

  const bookings = getBookings();
  const newBooking = {
    id: `bk_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    name: name.trim(),
    date: date.trim(),
    time: time.trim(),
    reason: (reason || 'General Inquiry').trim(),
    createdAt: new Date().toISOString()
  };

  bookings.push(newBooking);
  saveBookings(bookings);
  logger.success(`New booking saved locally: [${newBooking.id}] ${newBooking.name} - ${newBooking.date} @ ${newBooking.time}`);

  // Asynchronously attempt to sync to Google Sheets (non-blocking, errors logged gracefully)
  appendBookingToSheet(newBooking).catch(err => {
    logger.error('Background Google Sheets sync error:', err.message);
  });

  return {
    success: true,
    message: `Appointment successfully booked for ${newBooking.name} on ${newBooking.date} at ${newBooking.time}.`,
    booking: newBooking
  };
}

module.exports = {
  checkAvailability,
  bookAppointment,
  getBookings
};
