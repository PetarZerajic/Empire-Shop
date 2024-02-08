import jwt from "jsonwebtoken";
import { IUser } from "../models/userModel";

import { Response } from "express";

const signToken = (_id: string) => {
  return jwt.sign({ _id }, "your-secret-key", {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const createSendToken = (user: IUser, status: number, res: Response) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: false,
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
