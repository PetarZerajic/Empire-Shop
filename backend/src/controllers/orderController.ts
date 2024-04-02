import { NextFunction, Request, Response } from "express";
import { Order } from "../models/orderModel";
import { AppError } from "../utils/appError";
import { Product } from "../models/productModel";

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await Order.find().populate("user", "id name");

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
    const order = await Order.find({ user: req.user._id }).populate(
      "user",
      "name email"
    );
    if (!order) {
      return next(new AppError(404, "Order not found"));
    }

    res.status(200).json({
      status: "success",
      data: order,
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
  const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice,shippingPrice, totalPrice} = req.body;

  if (!orderItems || orderItems.length === 0) {
    return next(new AppError(404, "No items"));
  }

  const order = await Order.create({
    orderItems: orderItems.map((item: any) => ({
      _id: item._id,
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

export const payOrderItemsAndUpdateStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new AppError(404, "Order  not found"));
    }

    for (const orderProduct of order.orderItems) {
      const product = await Product.findById(orderProduct._id);
      if (!product) {
        return next(new AppError(404, "Product not found"));
      }
 
    product.countInStock -= orderProduct.quantity;

    await product.save()
    }
    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
    };

    const updatedOrder = await order.save();
    res.status(200).json({
      status: "success",
      data: { updatedOrder },
    });
  } catch (err) {
    next(err);
  }
  
  }

export const updateOrderToDelivered = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new AppError(404, "Order not found"));
    }

    order.isDelivered = true;
    order.deliveredAt = new Date();
    const updatedOrder = await order.save();
    res.status(200).json({
      status: "success",
      data: { updatedOrder },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
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
