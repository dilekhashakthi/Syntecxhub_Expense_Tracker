const XLSX = require("xlsx");
const {
  TRANSACTION_TYPES,
  listTransactions,
} = require("./transaction.service.js");

async function exportTransactions(type, userId) {
  const { labelField, sheetName } = TRANSACTION_TYPES[type];
  const items = await listTransactions(type, userId);

  const rows = items.map((item) => {
    let dateStr = "";
    if (item.date) {
      try {
        dateStr = new Date(item.date).toISOString().slice(0, 10);
      } catch (err) {
        dateStr = String(item.date);
      }
    }

    return {
      [labelField[0].toUpperCase() + labelField.slice(1)]: item[labelField],
      Amount: item.amount,
      Date: dateStr,
    };
  });

  const book = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(book, XLSX.utils.json_to_sheet(rows), sheetName);

  return {
    buffer: XLSX.write(book, { type: "buffer", bookType: "xlsx" }),
    filename: `${sheetName.toLowerCase()}.xlsx`,
  };
}

module.exports = exportTransactions;
