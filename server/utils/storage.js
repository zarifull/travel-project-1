import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    let resourceType = "image"; 
    let folder = "tours";       

    if (file.mimetype.startsWith("video/")) {
      resourceType = "video";
      folder = "videos"; 
    }

    const params = {
      folder,
      resource_type: resourceType,
      public_id: file.originalname.split(".")[0],
    };

    
    if (resourceType === "image") {
      params.allowed_formats = ["jpg", "jpeg", "png", "webp"];
      params.transformation = [{ width: 800, height: 600, crop: "limit" }];
    } else {
      params.allowed_formats = ["mp4", "mov", "avi", "webm"];
    }

    return params;
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

export default upload;
