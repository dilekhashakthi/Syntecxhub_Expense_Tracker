const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    icon: {
      type: String,
      default: "",
    },
    source: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0.01,
      default: 0,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
