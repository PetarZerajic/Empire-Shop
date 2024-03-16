import { Request, Response, NextFunction } from "express";
import { Product } from "../models/productModel";
import { AppError } from "../utils/appError";

export const getAllproducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Number(req.query.pageNumber) || 1;
    const perPage = 8;
    const start = (page - 1) * perPage;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .skip(start)
      .limit(perPage);

    res.status(200).json({
      status: "success",
      results: products.length,
      page,
      pages: Math.ceil(count / perPage),
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

export const getTopProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find().sort({ rating: -1 }).limit(5);

    res.status(200).json({
      status: "success",
      data: products,
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
