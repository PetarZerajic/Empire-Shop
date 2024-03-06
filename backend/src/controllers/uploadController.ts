import { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";
import { AppError } from "../utils/appError";

const multerStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "../frontend/public/images/products");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: multerStorage,
});

export const uploadOnePhoto = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return next(new AppError(400, "Upload failed"));
    }

    res.status(200).json({
      status: "success",
      image: req.file?.filename,
    });
  });
};
