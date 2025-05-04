import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    phoneNumber: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
