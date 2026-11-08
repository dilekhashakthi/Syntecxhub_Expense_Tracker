const Income = require("../models/Income.js");
const Expense = require("../models/Expense.js");
const { sumAmounts, round2 } = require("../utils/calculations.js");
const { isWithinDays } = require("../utils/dateHelpers.js");

async function getDashboardSummary(userId) {
  const [incomes, expenses] = await Promise.all([
    Income.find({ userId }).sort({ date: -1, createdAt: -1 }),
    Expense.find({ userId }).sort({ date: -1, createdAt: -1 }),
  ]);

  const last60DaysIncome = incomes.filter((income) =>
    isWithinDays(income.date, 60),
  );
  const last30DaysExpenses = expenses.filter((expense) =>
    isWithinDays(expense.date, 30),
  );

  const recentTransactions = [
    ...incomes.map((income) => ({
      ...income.toObject(),
      type: "income",
      label: income.source,
    })),
    ...expenses.map((expense) => ({
      ...expense.toObject(),
      type: "expense",
      label: expense.category,
    })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const totalIncome = sumAmounts(incomes);
  const totalExpense = sumAmounts(expenses);

  return {
    totalBalance: round2(totalIncome - totalExpense),
    totalIncome,
    totalExpense,
    last30DaysExpenses: {
      total: sumAmounts(last30DaysExpenses),
      transactions: last30DaysExpenses,
    },
    last60DaysIncome: {
      total: sumAmounts(last60DaysIncome),
      transactions: last60DaysIncome,
    },
    recentIncome: incomes.slice(0, 5),
    recentExpenses: expenses.slice(0, 5),
    recentTransactions,
  };
}

module.exports = getDashboardSummary;
