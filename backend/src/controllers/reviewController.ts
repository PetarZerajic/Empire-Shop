import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import { Product } from "../models/productModel";
import { Review } from "../models/reviewModel";
import mongoose from "mongoose";

export const getAllReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let filter = {};
    if (req.params.id) filter = { product: req.params.id };

    const reviews = await Review.find(filter);

    if (!reviews) {
      return next(new AppError(404, "No document found"));
    }
    res.status(200).json({
      status: "success",
      results: reviews.length,
      data: reviews,
    });
  } catch (err) {
    next(err);
  }
};

export const getReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(new AppError(404, "No document found with that ID"));
  }
  res.status(200).json({
    status: "success",
    data: review,
  });
  next();
};

export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new AppError(404, "No document found with that ID"));
    }
    const alreadyReviewed = product.reviews.find(
      (review) => review.user._id.toString() === req.user.id.toString()
    );

    if (alreadyReviewed) {
      return next(new AppError(400, "Product already reviewd!"));
    }
    const review = {
      _id: new mongoose.Types.ObjectId(),
      name: req.user.name,
      rating: req.body.rating,
      comment: req.body.comment,
      user: req.user._id,
      product: product._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((total, current) => total + current.rating, 0) /
      product.reviews.length;

    await product.save();
    await Review.create(review);

    res.status(201).json({
      status: "success",
      data: { review },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return next(new AppError(404, "No review found with that id"));
    }
    const product = await Product.findById(review.product);

    if (!product) {
      return next(new AppError(404, "No product find with that id"));
    }

    let numReviews = product.reviews.length - 1;
    let newRating = 0;
    if (numReviews > 0) {
      const sumRatings = product.reviews.reduce((acc, curr) => {
        if (curr._id?.toString() !== review._id?.toString()) {
          return acc + curr.rating;
        }
        return acc;
      }, 0);
      newRating = sumRatings / numReviews;
    }

    await Product.updateOne(
      { _id: review.product },
      {
        $pull: { reviews: { _id: review._id } },
        $set: {
          numReviews: numReviews,
          rating: newRating,
        },
      }
    );

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    return next(err);
  }
};
