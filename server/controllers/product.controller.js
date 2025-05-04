import { Product } from "../models/product.model.js";
import {
  deleteMedia,
  uploadMedia,
  uploadMultipleImages,
} from "../utils/cloudinary.js";

export const createProduct = async (req, res) => {
  try {
    const { title, description, price, stock, category, brand } = req.body;
    const thumbnailUrl = req.file;
    if (
      !title ||
      !description ||
      !price ||
      !stock ||
      !category ||
      !brand ||
      !thumbnailUrl
    ) {
      return res.status(400).json({
        message: "* field are required",
        success: false,
      });
    }

    const cloudResponse = await uploadMedia(thumbnailUrl.path);
    const thumbnail = cloudResponse.secure_url;

    const product = await Product.create({
      title,
      description,
      price,
      stock,
      category,
      brand,
      thumbnail,
    });
    await product.save();
    return res.status(200).json({
      message: "Product created successfully",
      success: true,
      product,
    });
  } catch (error) {
    console.log("Error in the add products controller", error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    let product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({
        message: "Product not found",
        success: false,
      });
    }
    const {
      discountPercentage,
      title,
      description,
      price,
      stock,
      category,
      brand,
    } = req.body;
    let sideImages = [];

    if (req.files && req.files.length > 0) {
      if (product.images && product.images.length >= 0) {
        for (const img of product.images) {
          await deleteMedia(img.public_id);
        }
      }
      sideImages = await uploadMultipleImages(req.files);
      product.images = sideImages;
    }
    if (discountPercentage) product.discountPercentage = discountPercentage;
    if (title) product.title = title;
    if (description) product.description = description;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = [...product.category, category];
    if (brand) product.brand = brand;

    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product,
      success: true,
    });
  } catch (error) {
    console.log("Error in the update the product controller", error);
    res.status(400).json({ success: false, message: "Product Update failed" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(400).json({
        message: "Products not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log("Error in the get all products is ", error);
  }
};
export const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({
        message: "Product not found",
        success: false,
      });
    }
    return res.status(200).json({
      product,
      success: true,
    });
  } catch (error) {
    console.log("Error in the get product by id is", error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    // if(product.thumbnailUrl){
    //   await deleteMedia(product.thumbnailUrl)
    // }
    if (product?.images && product?.images?.length > 0) {
      for (const img of product.images) {
        await deleteMedia(img.public_id);
      }
    }
    await Product.findByIdAndDelete(productId);
    return res.status(200).json({
      message: "Product delete successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in the delete product controller is", error);
  }
};
