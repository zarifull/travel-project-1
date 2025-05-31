import {v2 as cloudinary } from 'cloudinary';
import dotenv  from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path);
    const imageUrl = result.secure_url;
}
export default cloudinary;