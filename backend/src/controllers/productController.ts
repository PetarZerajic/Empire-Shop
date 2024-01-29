import { Request, Response, NextFunction } from "express";
import { Product } from "../models/productModel";
import { AppError } from "../utils/appError";

export const getAllproducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: "success",
      results: products.length,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

export const getOneProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(req.params.id).select("-__v");

    if (!product) {
      return next(new AppError(404, "There is no document with that id"));
    }
    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};
