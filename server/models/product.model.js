import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [
      {
        public_id: String,
        secure_url: String,
      },
    ],
    stock: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0 },
    noOfReviews: { type: Number, default: 0 },
    // reviews: [
    //   {
    //     user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    //     name: { type: String },
    //     rating: { type: Number },
    //     comment: { type: String },
    //   },
    // ],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    category: [{ type: String, required: true }],
    brand: { type: String, required: true },
    discountPercentage: { type: Number, default: 0 },
    thumbnail: { type: String, required: true },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
