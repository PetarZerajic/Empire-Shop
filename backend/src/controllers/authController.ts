import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError";
import { User } from "../models/userModel";

interface IDecoded {
  userId: string;
  iat: number;
  exp: number;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;

    token = req.cookies.jwt;

    if (!token) {
      return next(
        new AppError(401, "You are not logged in! Please log in to get access.")
      );
    }
    const message = "JWT_SECRET is not defined in the env file";

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || message
    ) as IDecoded;

    const user = await User.findById(decoded.userId);
    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

export const admin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== "admin") {
    return next(new AppError(401, "Not authorized as admin"));
  }
  next();
};
