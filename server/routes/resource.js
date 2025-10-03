import express from "express";
import upload from "../utils/storage.js"; // your multer-cloudinary setup
import {
  getResources,
  createResource,
  updateResource,
  deleteResource,
} from "../controllers/resourceController.js";

const router = express.Router();

// GET all resources
router.get("/", getResources);

// POST create new resource (with image upload)
router.post("/", upload.single("image"), createResource);

// PUT update resource
router.put("/:id", upload.single("image"), updateResource);

// DELETE resource
router.delete("/:id", deleteResource);

export default router;
