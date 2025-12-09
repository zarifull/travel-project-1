import express from "express";
import upload from "../utils/storage.js"; 
import {
  getResources,
  createResource,
  updateResource,
  deleteResource,
} from "../controllers/resourceController.js";

const router = express.Router();

router.get("/", getResources);

router.post("/", upload.single("image"), createResource);

router.put("/:id", upload.single("image"), updateResource);

router.delete("/:id", deleteResource);

export default router;
