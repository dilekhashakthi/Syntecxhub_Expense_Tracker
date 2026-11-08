const { incomeController } = require("../controllers/transaction.controller.js");
const createTransactionRoutes = require("./transaction.routes.js");

module.exports = createTransactionRoutes(incomeController);
