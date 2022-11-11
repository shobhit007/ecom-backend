const router = require("express").Router();
const Cart = require("../models/Cart");
const requireAuth = require("../middlewares/requireAuth");

//add product to user's cart
router.post("/:userId/add", requireAuth, async (req, res) => {
  try {
    const cart = new Cart({
      userId: req.params.userId,
      product: req.body.item,
    });
    await cart.save();
    res.send("added to cart");
  } catch (error) {
    return res.status(403).send({ error: error.message });
  }
});

//remove product to user's cart

module.exports = router;
