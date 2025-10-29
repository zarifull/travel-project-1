import express from "express";
import upload from "../utils/storage.js";
import {
  createResourceDetail,
  getAllResourceDetails,
  getResourceDetailById,
  updateResourceDetail,
  deleteResourceDetail,
  getResourceDetailByResourceId,
  deleteResourceDetailPhoto
} from "../controllers/resourceDetailController.js";
import {protect,isAdmin} from '../middleware/authMiddleware.js';

const router = express.Router();

const cpUpload = upload.fields([
  { name: "photo", maxCount: 10 },
  { name: "video", maxCount: 3 },
]);


router.post("/",protect,isAdmin, cpUpload, createResourceDetail);

router.get("/", protect, getAllResourceDetails);


router.get("/by-resource/:resourceId",protect, getResourceDetailByResourceId);

router.get("/:id", protect, getResourceDetailById);

router.put("/:id", protect,isAdmin, cpUpload, updateResourceDetail);

router.delete("/:id",protect,isAdmin, deleteResourceDetail);
router.delete("/:id/photo",protect,isAdmin,deleteResourceDetailPhoto)

export default router;
