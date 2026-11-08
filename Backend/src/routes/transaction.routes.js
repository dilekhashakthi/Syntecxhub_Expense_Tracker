const express = require("express");
const protect = require("../middleware/auth.middleware.js");

function createTransactionRoutes(controller) {
  const router = express.Router();
  router.use(protect);

  router.route("/").get(controller.list).post(controller.create);
  router.get("/download", controller.download);
  router.delete("/:id", controller.remove);

  return router;
}

module.exports = createTransactionRoutes;
