import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const uploadImage = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: "image",
  });
  return result.secure_url;
};

export const uploadVideo = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: "video",
  });
  return result.secure_url;
};

export default cloudinary;
