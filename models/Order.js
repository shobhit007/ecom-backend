const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    orders: [
      {
        productId: { type: String },
        productName: { type: String },
        amount: { type: Number },
        address: { type: Object },
        status: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
