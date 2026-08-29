const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const logger = require('./logger');

let doc = null;
let isInitialized = false;

async function getDoc() {
  if (doc && isInitialized) return doc;

  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY
    ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    : null;
  const rawSheetId = process.env.GOOGLE_SHEET_ID;
  const sheetId = rawSheetId
    ? ((rawSheetId.match(/\/d\/([a-zA-Z0-9-_]+)/) || [])[1] || rawSheetId.trim())
    : null;

  if (!clientEmail || !privateKey || !sheetId) {
    logger.warn('Google Sheets environment variables missing (GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID). Sheets sync disabled.');
    return null;
  }

  try {
    const serviceAccountAuth = new JWT({
      email: clientEmail,
      key: privateKey,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
    await doc.loadInfo();
    isInitialized = true;
    logger.info(`Google Sheets connected successfully: "${doc.title}"`);
    return doc;
  } catch (err) {
    logger.error('Failed to initialize Google Sheets connection:', err.message);
    return null;
  }
}

/**
 * Appends a booking to Google Sheet
 * @param {Object} booking - { id, name, date, time, reason, createdAt }
 */
async function appendBookingToSheet(booking) {
  try {
    const spreadsheet = await getDoc();
    if (!spreadsheet) {
      logger.warn('Skipping Google Sheet sync because sheets client is not configured.');
      return false;
    }

    // Use the first sheet
    const sheet = spreadsheet.sheetsByIndex[0];
    if (!sheet) {
      logger.warn('No sheet tab found in the Google Spreadsheet.');
      return false;
    }

    // Set headers if sheet is empty
    try {
      await sheet.setHeaderRow(['ID', 'Name', 'Date', 'Time', 'Reason', 'Created At']);
    } catch (headerErr) {
      // Header row might already exist, continue
    }

    await sheet.addRow({
      ID: booking.id || '',
      Name: booking.name || '',
      Date: booking.date || '',
      Time: booking.time || '',
      Reason: booking.reason || '',
      'Created At': booking.createdAt || new Date().toISOString()
    });

    logger.success(`Booking row added to Google Sheet for: ${booking.name} on ${booking.date} at ${booking.time}`);
    return true;
  } catch (error) {
    // Requirements: If Sheets write fails, still return success, just log the error.
    logger.error('Google Sheets append error (local booking unaffected):', error.message);
    return false;
  }
}

module.exports = {
  appendBookingToSheet,
  getDoc
};
