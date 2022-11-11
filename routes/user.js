const cryptoJS = require("crypto-js");
const User = require("../models/User");
const requireAuth = require("../middlewares/requireAuth");
const requireAdminAuth = require("../middlewares/requireAdminAuth");
const router = require("express").Router();

//Get user data
router.get("/", requireAuth, (req, res) => {
  const { password, ...otherProps } = req.user._doc;
  res.send(otherProps);
});

//get user data by admin
router.get("/:id", requireAdminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("not found");
    }
    const { password, ...otherProps } = user._doc;
    res.send(otherProps);
  } catch (error) {
    return res.status(403).send({ error: error.message });
  }
});

//Get all user by admin
router.get("/admin/all", requireAdminAuth, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    return res.status(403).send({ error: error.message });
  }
});

//Update user
// router.put("/:id", async (req, res) => {
//   if (req.user.id === req.params.id) {
//     if (req.body.password) {
//       req.body.password = cryptoJS.AES.encrypt(
//         req.body.password,
//         process.env.PASS_SEC_KEY
//       ).toString();
//     }

//     try {
//       const updatedUser = await User.findByIdAndUpdate(
//         req.params.id,
//         {
//           $set: req.body,
//         },
//         { new: true }
//       );

//       res.status(200).json(updatedUser);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   } else {
//     return res.status(403).json("You're not valid for this.");
//   }
// });

module.exports = router;
