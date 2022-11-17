const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    orders: [
      {
        product: {
          id: String,
          name: String,
          price: Number,
          quantity: Number,
          size: String,
          color: String,
          image: String,
        },
        address: { type: String },
        name: { type: String },
        status: { type: String, default: "pending" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
