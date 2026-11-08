const asyncHandler = require("../utils/asyncHandler.js");
const {
  createTransaction,
  deleteTransaction,
  listTransactions,
} = require("../services/transaction.service.js");
const exportTransactions = require("../services/export.service.js");
const ApiResponse = require("../utils/ApiResponse.js");

function buildController(type) {
  return {
    list: asyncHandler(async (req, res) => {
      const transactions = await listTransactions(type, req.user._id);
      new ApiResponse(200, transactions).send(res);
    }),

    create: asyncHandler(async (req, res) => {
      const transaction = await createTransaction(
        type,
        req.user._id,
        req.body,
      );
      new ApiResponse(
        201,
        transaction,
        "Transaction created successfully",
      ).send(res);
    }),

    remove: asyncHandler(async (req, res) => {
      await deleteTransaction(type, req.user._id, req.params.id);
      new ApiResponse(200, null, "Transaction deleted successfully").send(res);
    }),

    download: asyncHandler(async (req, res) => {
      const { buffer, filename } = await exportTransactions(type, req.user._id);
      res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      );
      res.send(buffer);
    }),
  };
}

const incomeController = buildController("income");
const expenseController = buildController("expense");

module.exports = { incomeController, expenseController };
