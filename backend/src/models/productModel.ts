import mongoose, { InferSchemaType } from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A product must have a name!"],
    trim: true,
    minLength: [3, "A product must have at least or equal than 3 characters"],
  },
  imageCover: {
    type: String,
    required: [true, "A product must have a image cover!"],
  },
  price: {
    type: Number,
    required: [true, "A product must have a price"],
  },
  description: {
    type: String,
    trim: true,
  },
  brand: {
    type: String,
    required: [true, "A product must have a brand "],
  },
  category: {
    type: String,
    required: [true, "A product must have a category which it belongs"],
  },
  countInStock: {
    type: Number,
    required: [true, "A product must have a countInStock"],
    default: 0,
    min: 0,
  },
  rating: {
    type: Number,
    default: 4.5,
    min: [1, "Rating must be above 1.0 "],
    max: [5, "Rating must be below 5.0"],
    set: (val: number) => Math.round(val * 10) / 10,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

export const Prouduct = mongoose.model("Product", productSchema);
