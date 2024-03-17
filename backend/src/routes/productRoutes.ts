import express from "express";
import {
  createProduct,
  deleteOneProduct,
  getAllproducts,
  getOneProduct,
  getTopProducts,
  updateProduct,
} from "../controllers/productController";
import { admin, protect } from "../controllers/authController";
import reviewRouter from "./reviewRoute";

const router = express.Router();

router.use("/:id/reviews", reviewRouter);

router.route("/").get(getAllproducts).post(protect, admin, createProduct);

router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getOneProduct)
  .patch(protect, admin, updateProduct)
  .delete(protect, admin, deleteOneProduct);

export default router;
