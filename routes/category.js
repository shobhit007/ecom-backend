const router = require("express").Router();
const requireAuthAdmin = require("../middlewares/requireAdminAuth");
const Category = require("../models/Category");
const Product = require("../models/Product");

//get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.send(categories);
  } catch (error) {
    return res.status(403).send({ error });
  }
});

//get categories items
router.get("/:categoryId", async (req, res) => {
  try {
    const items = await Product.find({ categoryId: req.params.categoryId });
    res.send(items);
  } catch (error) {
    return res.status(403).send({ error });
  }
});

//add a new category
router.post("/add", requireAuthAdmin, async (req, res) => {
  try {
    const category = new Category(req.body.category);
    await category.save();
    res.send("category saved");
  } catch (error) {
    return res.status(403).send({ error });
  }
});

//update a category
router.put("/:categoryId/update", requireAuthAdmin, async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.categoryId,
      {
        $set: req.category,
      },
      { new: true }
    );
    res.send("category updated");
  } catch (error) {
    return res.status(403).send({ error });
  }
});

//delete a category
router.delete("/:categoryId/delete", requireAuthAdmin, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.categoryId);
    res.send("category deleted.");
  } catch (error) {
    return res.status(403).send({ error });
  }
});

module.exports = router;
