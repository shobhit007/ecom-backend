const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

//Routes
const user = require("./routes/user");
const auth = require("./routes/auth");
const admin = require("./routes/admin");
const products = require("./routes/product");
const order = require("./routes/order");
const cart = require("./routes/cart");
const category = require("./routes/category");

const app = express();

dotenv.config();

mongoose
  .connect(process.env.MONGO_KEY)
  .then(() => console.log("DB connected."))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use("/user", user);
app.use("/auth", auth);
app.use("/admin", admin);
app.use("/product", products);
app.use("/order", order);
app.use("/cart", cart);
app.use("/category", category);

app.listen(5000, () => console.log("server listening on port 5000"));
