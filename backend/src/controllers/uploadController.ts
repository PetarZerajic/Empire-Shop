import { Request, Response, NextFunction } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import sharp from "sharp";
import { AppError } from "../utils/appError";

export const uploadOnePhoto = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { category } = req.params;
  let uploadPath = "";

  enum Path {
    Products = "../frontend/public/images/products",
    Users = "../frontend/public/images/users",
  }

  if (category === "products") {
    uploadPath = Path.Products;
  } else if (category === "users") {
    uploadPath = Path.Users;
  } else {
    return next(new AppError(400, "Invalid category type"));
  }

  const multerFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: multerFilter,
  });

  upload.single("image")(req, res, async (err) => {
    if (err) {
      return next(new AppError(400, "Upload failed"));
    }

    const extension = path.extname(req.file?.originalname!);
    const fileName = path.basename(req.file?.originalname!, extension);
    const uniqueFileName = `${fileName}-${Date.now()}${extension}`;

    req.body.imageCover = uniqueFileName;

    await sharp(req.file?.buffer)
      .resize(
        uploadPath.endsWith("users")
          ? { width: 128, height: 128 }
          : { width: 550, height: 550 }
      )
      .toFile(`${uploadPath}/${req.body.imageCover}`);

    res.status(200).json({
      status: "success",
      image: req.body.imageCover,
    });
  });
};
