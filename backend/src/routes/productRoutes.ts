import express from "express";
import {
  createProduct,
  deleteOneProduct,
  getAllproducts,
  getOneProduct,
  updateProduct,
} from "../controllers/productController";
import { admin, protect } from "../controllers/authController";
const router = express.Router();

router.use(protect);
router.route("/").get(getAllproducts).post(admin, createProduct);
router
  .route("/:id")
  .get(getOneProduct)
  .patch(updateProduct)
  .delete(deleteOneProduct);

export default router;
