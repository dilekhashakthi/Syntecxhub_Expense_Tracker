const Income = require("../models/Income.js");
const Expense = require("../models/Expense.js");
const ApiError = require("../utils/ApiError.js");
const { validateTransaction } = require("../utils/validators.js");

const TRANSACTION_TYPES = {
  income: { Model: Income, labelField: "source", sheetName: "Income" },
  expense: { Model: Expense, labelField: "category", sheetName: "Expenses" },
};

const listTransactions = (type, userId) => {
  const { Model } = TRANSACTION_TYPES[type];
  return Model.find({ userId }).sort({ date: -1, createdAt: -1 });
};

async function createTransaction(type, userId, body) {
  const { Model, labelField } = TRANSACTION_TYPES[type];
  const { icon, label, amount, date } = validateTransaction(body, labelField);
  return Model.create({ userId, icon, [labelField]: label, amount, date });
}

async function deleteTransaction(type, userId, id) {
  const { Model } = TRANSACTION_TYPES[type];
  const deleted = await Model.findOneAndDelete({ _id: id, userId });
  if (!deleted) throw new ApiError(404, "That record no longer exists.");
}

module.exports = {
  TRANSACTION_TYPES,
  listTransactions,
  createTransaction,
  deleteTransaction,
};
