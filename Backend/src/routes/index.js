const express = require("express");
const authRoutes = require("./auth.routes.js");
const dashboardRoutes = require("./dashboard.routes.js");
const incomeRoutes = require("./income.routes.js");
const expenseRoutes = require("./expense.routes.js");

const router = express.Router();

router.get("/health", (_req, res) => res.json({ ok: true }));

router.use("/auth", authRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/income", incomeRoutes);
router.use("/expense", expenseRoutes);

module.exports = router;
