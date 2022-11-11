const router = require("express").Router();
const requireAdminAuth = require("../middlewares/requireAdminAuth");
const Product = require("../models/Product");

//Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch (error) {
    return res.send({ error: error.message });
  }
});

//get single product
router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    res.send(product);
  } catch (error) {
    return res.status(403).send({ error });
  }
});

//Add new product
router.post("/add-new-product", requireAdminAuth, async (req, res) => {
  const { product } = req.body;

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(200).send("product saved");
  } catch (error) {
    return res.send({ error: error.message });
  }
});

//Update product
router.put("/:id/update", requireAdminAuth, async (req, res) => {
  const { product } = req.body;
  const productId = req.params.id;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: product },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    return res.send({ error: error.message });
  }
});

//Delete product
router.delete("/:id/delete", requireAdminAuth, async (req, res) => {
  const productId = req.params.id;

  try {
    await Product.findByIdAndDelete(productId);
    res.status(200).json("product deleted.");
  } catch (error) {
    return res.send({ error: error.message });
  }
});

module.exports = router;
