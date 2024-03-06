import express from "express";
import {
  addOrderItems,
  getAllOrders,
  getMyOrders,
  getOrder,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/orderController";
import { admin, protect } from "../controllers/authController";

const router = express.Router();

router.use(protect);
router.route("/").get(admin, getAllOrders).post(addOrderItems);
router.route("/myorders").get(getMyOrders);
router.route("/:id").get(getOrder);
router.route("/:id/pay").patch(updateOrderToPaid);
router.route("/:id/deliver").patch(updateOrderToDelivered);

export default router;
