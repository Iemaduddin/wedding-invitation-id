/**
 * Google Apps Script — Wedding Wishes API
 *
 * 1.  Buka https://sheets.new  →  buat Sheet baru
 * 2.  Extensions  →  Apps Script
 * 3.  Paste seluruh isi file ini
 * 4.  Simpan & beri nama project (mis. "Wedding Wishes")
 * 5.  Deploy  →  New deployment  →  Type: Web App
 *     - Execute as: Me
 *     - Who has access: Anyone
 * 6.  Copy URL deployment-nya
 * 7.  Tempelkan URL itu ke komponen Vue (lihat catatan di WishesSection.vue)
 */

// ── konfigurasi ──────────────────────────────────────────
const SHEET_NAME = 'Wishes'

/**
 * Menyiapkan sheet jika belum ada
 */
function ensureSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(SHEET_NAME)
  if (sheet) return sheet

  sheet = ss.insertSheet(SHEET_NAME)
  sheet.appendRow(['name', 'message', 'timestamp'])
  return sheet
}

// ── endpoint GET ─────────────────────────────────────────
function doGet() {
  try {
    const sheet = ensureSheet_()
    const data = sheet.getDataRange().getValues()
    const headers = data.shift()

    const wishes = data
      .map((row) => ({
        name: String(row[0] ?? ''),
        message: String(row[1] ?? ''),
        time: row[2] ? new Date(row[2]).getTime() : Date.now(),
      }))
      .reverse() // terbaru di atas

    return respondJson(wishes)
  } catch (err) {
    return respondJson({ error: err.message }, 500)
  }
}

// ── endpoint POST ────────────────────────────────────────
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents)
    const sheet = ensureSheet_()

    sheet.appendRow([body.name, body.message, new Date()])

    return respondJson({ success: true })
  } catch (err) {
    return respondJson({ success: false, error: err.message }, 500)
  }
}

// ── helper ───────────────────────────────────────────────
function respondJson(payload, statusCode = 200) {
  const output = ContentService.createTextOutput(JSON.stringify(payload))
  output.setMimeType(ContentService.MimeType.JSON)

  // Untuk akses dari origin mana pun (termasuk GitHub Pages)
  const response = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  // Sayangnya ContentService tidak support setHeader secara native.
  // Tapi Web App Google sudah otomatis menambahkan CORS header untuk GET.
  // Untuk POST, pastikan deployment set "Who has access: Anyone".
  return output
}
