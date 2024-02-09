import jwt from "jsonwebtoken";
import { IUser } from "../models/userModel";

import { CookieOptions, Response } from "express";

const signToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "120d",
  });
};

export const createSendToken = (user: IUser, status: number, res: Response) => {
  const token = signToken(user._id);

  const cookieOptions: CookieOptions = {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 90 * 24 * 60 * 60 * 1000, //90d
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(status).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
