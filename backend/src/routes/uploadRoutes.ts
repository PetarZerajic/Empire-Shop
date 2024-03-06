import express from "express";
import { uploadOnePhoto } from "../controllers/uploadController";

const router = express.Router();

router.post("/", uploadOnePhoto);

export default router;
