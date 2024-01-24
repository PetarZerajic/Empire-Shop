import express from "express";
import { products } from "./data/products";

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/product/:id", (req, res) => {
  const product = products.find((p) => p._id === +req.params.id);
  res.json(product);
});
app.listen(port, () => {
  console.log("Server running on port:" + port);
});
