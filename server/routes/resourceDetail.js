import express from "express";
import upload from "../utils/storage.js";
import {
  createResourceDetail,
  getAllResourceDetails,
  getResourceDetailById,
  updateResourceDetail,
  deleteResourceDetail,
  getResourceDetailByResourceId,
} from "../controllers/resourceDetailController.js";

const router = express.Router();

const cpUpload = upload.fields([
  { name: "photo", maxCount: 10 },
  { name: "logo", maxCount: 10 },
  { name: "video", maxCount: 3 },
]);


router.post("/", cpUpload, createResourceDetail);

router.get("/", getAllResourceDetails);


router.get("/by-resource/:resourceId", getResourceDetailByResourceId);

router.get("/:id", getResourceDetailById);

router.put("/:id", cpUpload, updateResourceDetail);

router.delete("/:id", deleteResourceDetail);


export default router;
