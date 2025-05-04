import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config({});
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_secret: process.env.API_SECRET,
  api_key: process.env.API_KEY,
});

export const uploadMedia = async (file) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return uploadResponse;
  } catch (error) {
    console.log("Error in the upload media in cloudinary", error);
  }
};

export const deleteMedia = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log("Error in the delete media in cloudinary", error);
  }
};

export const uploadMultipleImages = async (files) => {
  try {
    const uploadedImages = [];
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: "auto",
      });

      uploadedImages.push({
        public_id: result.public_id,
        secure_url: result.secure_url,
      });
    }
    return uploadedImages;
  } catch (error) {
    console.log("Error in the uploading multiple images is", error);
  }
};
