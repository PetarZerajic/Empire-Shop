import { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";
import { AppError } from "../utils/appError";

export const uploadOnePhoto = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { category } = req.params;
  let uploadPath = "";

  if (category === "products") {
    uploadPath = "../frontend/public/images/products";
  } else if (category === "users") {
    uploadPath = "../frontend/public/images/users";
  } else {
    return next(new AppError(400, "Invalid category type"));
  }

  const multerStorage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, uploadPath);
    },
    filename(req, file, cb) {
      const originalname = path.basename(
        file.originalname,
        path.extname(file.originalname)
      );
      const extension = path.extname(file.originalname);

      cb(null, `${originalname}-${Date.now()}${extension}`);
    },
  });

  const upload = multer({
    storage: multerStorage,
  });

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
