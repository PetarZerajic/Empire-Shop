import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError";
import { User } from "../models/userModel";
import { createSendToken } from "../utils/createSendToken";

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

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    createSendToken(user, 201, res);
  } catch (err) {
    next(err);
  }
};

export const logInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError(400, "Please provide valid email or password"));
    }
    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user || !(await user.correctPassword(password))) {
      return next(new AppError(401, "Incorect email or password"));
    }

    createSendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

export const logOutUser = async (req: Request, res: Response) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully!",
  });
};
