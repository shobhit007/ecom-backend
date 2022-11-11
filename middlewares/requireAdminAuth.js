const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send("You must be logged in.");
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_TOKEN_PASS, async (err, payload) => {
    if (err) return res.status(401).send("You must be logged in.");

    const { isAdmin, adminId } = payload;

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(422).send("You're not authorized.");
    }

    if (!isAdmin || adminId !== admin._id.toString()) {
      return res.status(422).send("You're not authorized.");
    }

    next();
  });
};
