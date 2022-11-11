const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    product: { type: Object },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
