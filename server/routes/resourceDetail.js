import express from "express";
import upload from "../utils/storage.js";
import {
  createResourceDetail,
  getAllResourceDetails,
  getResourceDetailById,
  updateResourceDetail,
  deleteResourceDetail,
} from "../controllers/resourceDetailController.js";

const router = express.Router();

const cpUpload = upload.fields([
  { name: "photo", maxCount: 10 },
  { name: "logo", maxCount: 1 },
]);

router.post("/", cpUpload, createResourceDetail);
router.get("/", getAllResourceDetails);
router.get("/:id", getResourceDetailById);
router.put("/:id", cpUpload, updateResourceDetail);
router.delete("/:id", deleteResourceDetail);

export default router;
