const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send("You must be logged in.");
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_TOKEN_PASS, async (err, payload) => {
    if (err) {
      return res.status(401).send("You must be logged in.");
    }

    const { userId } = payload;
    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};
