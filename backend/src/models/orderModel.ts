import mongoose, { InferSchemaType } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Order must belong to a user!"],
    },
    orderItems: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        name: { type: String, required: [true, "Oreder must have a name"] },
        quantity: {
          type: Number,
          required: [true, "Order must have a quantity"],
        },
        imageCover: {
          type: String,
          required: [true, "Order must have a image"],
        },
        price: { type: Number, required: [true, "Order must have a price"] },
      },
    ],
    shippingAddress: {
      address: {
        type: String,
        required: [true, "Shipping address must have a address"],
      },
      city: {
        type: String,
        required: [true, "Shipping address must have a city"],
      },
      postalCode: {
        type: String,
        required: [true, "Shipping address must have a postal code"],
      },
      country: {
        type: String,
        required: [true, "Shipping address must have a country"],
      },
    },
    paymentMethod: {
      type: String,
      required: [true, "Order must have a payment method"],
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    itemsPrice: {
      type: Number,
      required: [true, "Order must have a items price"],
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: [true, "Order must have a tax price"],
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: [true, "Order must have a  shipping price"],
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: [true, "Order must have a total price"],
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: [true, "Order must have a paid status"],
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: [true, "Order must have a delivered status"],
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
export type Order = InferSchemaType<typeof orderSchema>;

export const Order = mongoose.model<Order>("Order", orderSchema);
