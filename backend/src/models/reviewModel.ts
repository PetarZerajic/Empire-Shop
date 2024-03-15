import mongoose, { InferSchemaType } from "mongoose";

export const reviewSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: { type: String, required: [true, "Name can not be empty!"] },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 0,
  },
  comment: String,

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Review  must belog to a user!"],
  },
});

type Review = InferSchemaType<typeof reviewSchema>;

export const Review = mongoose.model<Review>("Review", reviewSchema);
