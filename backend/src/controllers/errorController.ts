import { Request, Response, NextFunction } from "express";
import { IError } from "../interfaces/IError";
import "dotenv/config";
import { AppError } from "../utils/appError";

const sendErrorForDev = (err: IError, req: Request, res: Response) => {
  if (req.originalUrl.startsWith("/api")) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
    console.log(err);
  }
};
const handleCastError = (err: IError) => {
  const message = `Invalid ${err.path}: ${err.value}`;

  return new AppError(404, message);
};

export const errorController = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.message = err.message;

  if ((process.env.NODE_ENV = "development")) {
    if (err.name === "CastError") err = handleCastError(err);
    sendErrorForDev(err, req, res);
  }
  next();
};
