import mongoose, { InferSchemaType, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required field"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required field"],
    validate: [validator.isEmail, "Please provide a valid email adress"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  photo: { type: String, default: "default.jpg" },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: Schema.Types.Mixed,
    required: [true, "Password is a required field"],
    minlength: [8, "Password must be at least 8 characters"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only wokrs on CREATE and SAVE !
      validator: function (this: mongoose.Document, value: number) {
        return value === this.get("password");
      },
      message: "Passwords are not the same! ",
    },
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

export const User = mongoose.model("User", userSchema);