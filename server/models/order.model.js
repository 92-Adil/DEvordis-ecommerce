import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number },
        price: { type: Number },
      },
    ],
    shippingAddress: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String },
      country: { type: String },
      phoneNumber: { type: String, required: true },
      email: { type: String, required: true },
    },
    paymentMethod: { type: String },
    paymentStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "completed", "failed"],
    },
    paymentId: {
      type: String
    },
    shippingPrice: { type: Number },
    totalPrice: { type: Number,required:true },
    isPaid: { type: Boolean },
    isDelivered: { type: Boolean },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
