import express from "express";
import "dotenv/config.js";
import { connectToDb } from "../config/db";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import { errorController } from "./controllers/errorController";
import morgan from "morgan";
import cookieParser from "cookie-parser";

connectToDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(errorController);
app.listen(port, () => {
  console.log("Server running on port:" + port);
});
