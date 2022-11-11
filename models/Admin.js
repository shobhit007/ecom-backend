const mongoose = require("mongoose");
const cryptoJS = require("crypto-js");

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// adminSchema.pre("save", function (next) {
//   const admin = this;
//   if (!admin.isModified("password")) {
//     next();
//   }

//   const hash = cryptoJS.AES.encrypt(
//     admin.password,
//     process.env.ADMIN_SEC_PASS_KEY
//   );
//   admin.password = hash;
//   next();
// });

adminSchema.methods.comparePassword = function (adminPassword) {
  const admin = this;

  const hashedPassword = cryptoJS.AES.decrypt(
    admin.password,
    process.env.ADMIN_SEC_PASS_KEY
  ).toString(cryptoJS.enc.Utf8);

  return new Promise((resolve, reject) => {
    if (adminPassword !== hashedPassword) {
      reject(false);
    }

    resolve(true);
  });
};

module.exports = mongoose.model("Admin", adminSchema);
