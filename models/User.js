const mongoose = require("mongoose");
const cryptoJS = require("crypto-js");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) {
    next();
  }

  const hashPassword = cryptoJS.AES.encrypt(
    user.password,
    process.env.PASS_SEC_KEY
  );
  user.password = hashPassword;
  next();
});

userSchema.methods.comparePassword = function (candidatePass) {
  const user = this;

  return new Promise((resolve, reject) => {
    const hashedPassword = cryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC_KEY
    ).toString(cryptoJS.enc.Utf8);

    if (candidatePass !== hashedPassword) {
      reject(false);
    }

    resolve(true);
  });
};

module.exports = mongoose.model("User", userSchema);
