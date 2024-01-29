import { User } from "../models/userModel";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";

export const gettAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      resultrs: users.length,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

export const getOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id).select("-__v");

    if (!user) {
      return next(new AppError(404, "No document found with that ID"));
    }
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
