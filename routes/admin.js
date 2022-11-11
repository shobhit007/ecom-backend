const router = require("express").Router();
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });

    if (!admin) {
      return res.status(422).send("Invalid email or password.");
    }

    await admin.comparePassword(req.body.password);

    const token = jwt.sign(
      { isAdmin: admin.isAdmin, adminId: admin._id },
      process.env.JWT_TOKEN_PASS
    );

    res.send({ token });
  } catch (error) {
    return res.status(422).send("Invalid email or password.");
  }
});

// router.post("/register", async (req, res) => {
//   const newAdmin = new Admin({
//     email: req.body.email,
//     password: req.body.password,
//   });

//   try {
//     const admin = await newAdmin.save();

//     res.send({ admin });
//   } catch (err) {
//     return res.status(422).json(err.message);
//   }
// });

module.exports = router;
