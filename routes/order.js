const router = require("express").Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const requireAdminAuth = require("../middlewares/requireAdminAuth");
const requireAuth = require("../middlewares/requireAuth");

//get user's orders
router.get("/user/:id", requireAuth, async (req, res) => {
  try {
    const user = await Order.findOne({ userId: req.params.id });
    res.send(user ? user.orders : null);
  } catch (error) {
    return res.status(403).send({ error: error.message });
  }
});
//add user's order
router.post("/user/:id/add", requireAuth, async (req, res) => {
  try {
    const user = await Order.findOne({ userId: req.params.id });

    if (!user) {
      const order = new Order({
        userId: req.params.id,
        orders: [...req.body.orders],
      });
      const newOrder = await order.save();
      await Cart.findOneAndRemove({ userId: req.params.id });
      return res.send([newOrder.orders]);
    }

    //user already
    await Order.findOneAndUpdate(
      { userId: req.params.id },
      {
        $push: {
          orders: [...req.body.orders],
        },
      }
    );

    await Cart.findOneAndRemove({ userId: req.params.id });
    const userOrder = await Order.findOne({ userId: req.params.id });
    res.send(userOrder.orders);
  } catch (error) {
    return res.status(403).send({ error: error.message });
  }
});

//Get all orders
router.get("/", requireAdminAuth, async (req, res) => {
  try {
    const orders = await Order.find({});
    res.send(orders);
  } catch (error) {
    return res.status(403).send({ error: error.message });
  }
});

//Update order
router.put("/:id", requireAdminAuth, async (req, res) => {
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
router.delete("/:id", requireAdminAuth, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.send("order deleted.");
  } catch (error) {
    return res.status(403).send({ error: error.message });
  }
});

module.exports = router;
