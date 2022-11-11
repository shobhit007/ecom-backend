const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const user = await newUser.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN_PASS);

    res.send({ token });
  } catch (err) {
    return res.status(422).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(422).send({ error: "Invalid email or password" });
    }

    await user.comparePassword(req.body.password);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN_PASS);
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "Invalid email or password" });
  }
});

module.exports = router;
