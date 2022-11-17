const router = require("express").Router();
const Cart = require("../models/Cart");
const requireAuth = require("../middlewares/requireAuth");
const Product = require("../models/Product");

//get all products of user's cart
router.get("/:userId", requireAuth, async (req, res) => {
  try {
    const userCart = await Cart.findOne({ userId: req.params.userId });
    res.send(userCart ? userCart.products : null);
  } catch (error) {
    return res.status(403).send({ error: error.message });
  }
});

router.get("/:userId/products", requireAuth, async (req, res) => {
  try {
    const user = await Cart.findOne({ userId: req.params.userId });
    if (!user) return res.send(null);
    const products = [];

    for (let i = 0; i < user.products.length; i++) {
      const product = await Product.findById(user.products[i].productId);
      if (product) products.push(product);
    }
    res.send(products);
  } catch (error) {
    return res.status(403).send({ error: error.message });
  }
});

//add product to user's cart
router.post("/:userId/add", requireAuth, async (req, res) => {
  try {
    const user = await Cart.findOne({ userId: req.params.userId });

    //no user yet
    if (!user) {
      const cart = new Cart({
        userId: req.params.userId,
        products: [req.body.product],
      });

      const newCart = await cart.save();
      return res.send([newCart.products]);
    }

    //user already
    await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      {
        $push: {
          products: req.body.product,
        },
      }
    );

    const userCart = await Cart.findOne({ userId: req.params.userId });
    res.send(userCart.products);
  } catch (error) {
    return res.status(403).send({ error: error.message });
  }
});

//update cart
router.put("/:userId/update", requireAuth, async (req, res) => {
  try {
    await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      { $pull: { products: { productId: req.body.productId } } }
    );

    const userCart = await Cart.findOne({ userId: req.params.userId });
    res.send(userCart.products);
  } catch (error) {
    return res.status(403).send({ error: error.message });
  }
});

module.exports = router;
