function doGet(e) {
  // Jika ada parameter "searchtext" maka return JSON
  if (e && e.parameter && e.parameter.searchtext) {
    const searchtext = e.parameter.searchtext;
    const result = search(searchtext);
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Kalau tidak ada parameter, tampilkan halaman index.html
  return HtmlService.createHtmlOutputFromFile("index")
    .setTitle("LuckySpin Search");
}

// Fungsi pencarian data dari Google Sheet
function search(searchtext) {
  const spreadsheetId = '1peYamj2OXNSBYWAKYTyUpmAhWxVlHnBVp04zBFLShwc'; // ganti dengan ID sheet kamu
  const range = 'BotLucky!A2:C';
  const values = Sheets.Spreadsheets.Values.get(spreadsheetId, range).values || [];

  const keyword = (searchtext || "").toString().toLowerCase();
  const result = [];

  values.forEach(row => {
    const userId = row[0]?.toString().toLowerCase() || "";
    // contains search, bukan exact
    if (userId.includes(keyword)) {
      result.push(row); // [UserID, Kode, Tanggal]
    }
  });

  return result;
}
