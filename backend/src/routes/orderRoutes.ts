import express from "express";
import {
  addOrderItems,
  deleteOrder,
  getAllOrders,
  getMyOrders,
  getOrder,
  updateOrderToDelivered,
  payOrderItemsAndUpdateStock,
} from "../controllers/orderController";
import { admin, protect } from "../controllers/authController";

const router = express.Router();

router.use(protect);
router.route("/").get(admin, getAllOrders).post(addOrderItems);
router.route("/myorders").get(getMyOrders);
router.route("/:id").get(getOrder).delete(admin, deleteOrder);
router.route("/:id/pay").patch(payOrderItemsAndUpdateStock);
router.route("/:id/deliver").patch(admin, updateOrderToDelivered);

export default router;
