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
    type: Schema.Types.Mixed,
    required: [true, "Please confirm your password"],
    validate: {
      // This only wokrs on CREATE and SAVE !
      validator: function (this: mongoose.Document, value: string) {
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const saltRoundes = 12;
  this.password = await bcrypt.hash(this.password, saltRoundes);
  this.passwordConfirm = undefined;
});

export const User = mongoose.model("User", userSchema);
