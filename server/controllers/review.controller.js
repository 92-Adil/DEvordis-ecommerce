import { Product } from "../models/product.model.js";
import { Review } from "../models/review.model.js";
import { User } from "../models/user.model.js";

export const createOrUpdateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { productId } = req.params;
    const userId = req.id;

    if (!rating || !comment) {
      return res
        .status(400)
        .json({ message: "Rating and comment are required" });
    }

    const product = await Product.findById(productId).populate("reviews");
    if (!product) return res.status(404).json({ message: "Product not found" });
    const user = await User.findById(userId);
    let review = await Review.findOne({ product: productId, user: userId });

    if (review) {
      review.rating = rating;
      review.comment = comment;
      await review.save();
    } else {
      review = new Review({
        product: productId,
        user: userId,
        name: user.name,
        rating,
        comment,
      });
      await review.save();

      product.reviews.push(review._id);
      product.noOfReviews = product.reviews.length;
    }

    const allReviews = await Review.find({ product: productId });
    const avgRating =
      allReviews.reduce((acc, curr) => acc + curr.rating, 0) /
      allReviews.length;

    product.rating = avgRating;
    await product.save();

    res.status(200).json({ message: "Review saved successfully", review ,success:true});
  } catch (error) {
    res
      .status(500)
      .json({
        message: "error in the review controller is",
        success:false
      });
  }
};
