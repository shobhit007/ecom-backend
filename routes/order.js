const router = require("express").Router();
const Order = require("../models/Order");
const requireAdminAuth = require("../middlewares/requireAdminAuth");

router.use(requireAdminAuth);

//Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.send(orders);
  } catch (error) {
    return res.status(403).send({ error: error.message });
  }
});

//Update order
router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.send(updatedOrder);
  } catch (error) {
    return res.status(403).send({ error: error.message });
  }
});

//Delete an order
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.send("order deleted.");
  } catch (error) {
    return res.status(403).send({ error: error.message });
  }
});

module.exports = router;
