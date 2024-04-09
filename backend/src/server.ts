import express from "express";
import { connectToDb } from "../config/db";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import reviewRoutes from "./routes/reviewRoute";
import { errorController } from "./controllers/errorController";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors"
import path from "path";
import "dotenv/config.js";

connectToDb();

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname ,'../../../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../frontend/dist'));
  });
} else {
  app.use(morgan("dev"))
}
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({
    clientId: process.env.PAYPAL_CLIENT_ID,
  })
);
app.use(errorController);
app.listen(port, () => {
  console.log("Server running on port:" + port);
});
