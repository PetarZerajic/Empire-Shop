import mongoose, { InferSchemaType } from "mongoose";

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "Review can not be empty!"],
  },
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
    select: false,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Review  must belog to a product!"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Review  must belog to a user!"],
  },
});
type Review = InferSchemaType<typeof reviewSchema>;

export const Review = mongoose.model<Review>("Review", reviewSchema);
