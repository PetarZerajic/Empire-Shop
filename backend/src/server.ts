import express from "express";
import "dotenv/config.js";
import { products } from "./data/products";
import { connectToDb } from "../config/db";

const app = express();
connectToDb();

const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/product/:id", (req, res) => {
  const id = +req.params.id;
  const product = products.find((p) => p._id === id);
  res.json(product);
});
app.listen(port, () => {
  console.log("Server running on port:" + port);
});
