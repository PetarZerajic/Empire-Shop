import express from "express";
import {
  addOrderItems,
  getAllOrders,
  getOrder,
} from "../controllers/orderController";
import { admin, protect } from "../controllers/authController";

const router = express.Router();

router.use(protect);
router.route("/").get(admin, getAllOrders).post(addOrderItems);
router.route("/:id").get(admin, getOrder);

export default router;
