import express from "express";
import { admin, protect } from "../controllers/authController";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReview,
} from "../controllers/reviewController";

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter
  .route("/")
  .get(protect, admin, getAllReviews)
  .post(protect, createReview);

reviewRouter
  .route("/:id")
  .get(protect, admin, getReview)
  .delete(protect, admin, deleteReview);

export default reviewRouter;
