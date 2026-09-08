/**
 * Apps Script bound to the Google Sheet:
 * https://docs.google.com/spreadsheets/d/11mheAaKnPTPku11hoRiKoqPcpYht-CYu0R3KmwXK41g/edit?gid=0#gid=0
 *
 * Deploy: Extensions → Apps Script → paste this file → Deploy → New deployment
 * → Type: Web app → Execute as: Me → Who has access: Anyone → Deploy → copy URL
 * into SHEET_WEBHOOK_URL in landing-page/src/App.jsx.
 */
const SHEET_ID = '11mheAaKnPTPku11hoRiKoqPcpYht-CYu0R3KmwXK41g';
const SHEET_NAME = 'Sheet1';
const HEADERS = ['Timestamp', 'Name', 'Email', 'Phone', 'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Term', 'UTM Content', 'Page URL'];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.utm_source || '',
      data.utm_medium || '',
      data.utm_campaign || '',
      data.utm_term || '',
      data.utm_content || '',
      data.page_url || ''
    ]);
    return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
