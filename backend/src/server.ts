import express from "express";
import "dotenv/config.js";
import { connectToDb } from "../config/db";
import { Prouduct } from "./models/productModel";
import { User } from "./models/userModel";

const app = express();
connectToDb();

const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/products", async (req, res, next) => {
  try {
    const products = await Prouduct.find();
    res.json({
      status: "success",
      results: products.length,
      data: products,
    });
  } catch (err) {
    next(err);
  }
});

app.get("/api/users", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({
      status: "success",
      results: users.length,
      data: users,
    });
  } catch (err) {
    next(err);
  }
});

app.get("/api/product/:id", async (req, res, next) => {
  try {
    const product = await Prouduct.findById(req.params.id);
    res.json({
      status: "success",
      data: product,
    });
  } catch (err) {
    next(err);
  }
});
app.listen(port, () => {
  console.log("Server running on port:" + port);
});
