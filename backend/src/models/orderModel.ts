import mongoose, { InferSchemaType } from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Order must belong to a user!"],
  },
  orderItems: [
    {
      name: { type: String, required: [true, "Oreder must have a name"] },
      quantity: {
        type: Number,
        required: [true, "Order must have a quantity"],
      },
      coverImage: { type: String, required: [true, "Order must have a image"] },
      price: { type: Number, required: [true, "Order must have a price"] },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product must belong to a user!"],
      },
    },
  ],
});
type Order = InferSchemaType<typeof orderSchema>;

export const Order = mongoose.model<Order>("Order", orderSchema);
