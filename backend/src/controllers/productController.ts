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
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      imageCover: req.body.imageCover,
      price: req.body.price,
      description: req.body.description,
      brand: req.body.brand,
      category: req.body.category,
      countInStock: req.body.countInStock,
      user: { _id: req.user._id, name: req.user.name, email: req.user.email },
    });
    res.status(201).json({
      status: "success",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new AppError(404, "There is no document with that id"));
    }
    product.name = req.body.name;
    product.imageCover = req.body.imageCover;
    product.price = req.body.price;
    product.description = req.body.description;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;

    const updateProduct = await product.save();

    res.status(201).json({
      status: "success",
      data: { updateProduct },
    });
  } catch (err) {
    next(err);
  }
};
export const deleteOneProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return next(new AppError(404, "There is no document with that id"));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
