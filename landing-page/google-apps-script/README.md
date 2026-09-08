# Google Sheet lead capture — 5-minute setup

The booking form posts name, email, phone, UTM parameters, timestamp, and page URL to this Google Sheet:

https://docs.google.com/spreadsheets/d/11mheAaKnPTPku11hoRiKoqPcpYht-CYu0R3KmwXK41g/edit?gid=0#gid=0

A browser cannot write to Google Sheets directly, so a Google Apps Script Web App acts as the endpoint.

## Setup

1. Open the sheet → **Extensions → Apps Script**.
2. Paste the contents of `Code.gs` and save.
3. Click **Deploy → New deployment → Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copy the Web App URL (starts with `https://script.google.com/macros/s/...`).
5. Paste it into `SHEET_WEBHOOK_URL` in `landing-page/src/App.jsx`.

## Behavior

- The form submits via `fetch(..., { mode: 'no-cors' })` so no CORS setup is needed.
- A 4-second timeout means a slow/unreachable endpoint never blocks checkout — the user is redirected to the Razorpay payment link regardless.
- Rows land in `Sheet1`; headers are created automatically on the first submission.

## Testing

- Test with `?utm_source=test&utm_medium=cpc` appended to the site URL and confirm the row (with UTM values) appears in the sheet.
- Apps Script redeployments create new URLs unless you edit the existing deployment; re-verify after any script change.
