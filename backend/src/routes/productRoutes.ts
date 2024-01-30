import express from "express";
import {
  getAllproducts,
  getOneProduct,
} from "../controllers/productController";
const router = express.Router();

router.get("/", getAllproducts);
router.route("/:id").get(getOneProduct);

export default router;
