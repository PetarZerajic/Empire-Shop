import { NextFunction, Request, Response } from "express";
import { Order } from "../models/orderModel";
import { AppError } from "../utils/appError";

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await Order.find();

    res.status(200).json({
      status: "success",
      results: order.length,
      data: { order },
    });
  } catch (err) {
    next(err);
  }
};

export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    res.status(200).json({
      status: "success",
      data: { order },
    });
  } catch (err) {
    next(err);
  }
};

export const getMyOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await Order.findById(req.user.id);

    res.status(200).json({
      status: "success",
      data: { order },
    });
  } catch (err) {
    next(err);
  }
};

export const addOrderItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return next(new AppError(404, "No items"));
  }

  const order = await Order.create({
    orderItems: orderItems.map((item: any) => ({
      ...item,
    })),
    user: req.user.id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  res.status(201).json({
    status: "success",
    data: { order },
  });
};