const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    images: [String],
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    sizes: [String],
    colors: [String],
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
