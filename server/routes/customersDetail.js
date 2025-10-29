import express from "express";
import upload from "../utils/storage.js";
import {
  createCustomer,
  getAllCustomers,
  getCustomersByResource,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getCommentsForCustomer,
  addCommentToCustomer,
  replyToComment,
  getAllCustomerDetailsByResourceDetail,
  deleteCommentHandler,
  deleteReplyHandler
} from "../controllers/customersDetailController.js";

import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

const cpUpload = upload.fields([
  { name: "photo", maxCount: 10 }
]);

router.post("/", cpUpload, createCustomer);
router.get("/", getAllCustomers);
router.get("/resource/:resourceDetailId", getCustomersByResource);
router.get("/all/:resourceDetailId", getAllCustomerDetailsByResourceDetail);
router.get("/:id", getCustomerById);
router.put("/:id", cpUpload, verifyToken, updateCustomer);
router.delete("/:id", verifyToken, deleteCustomer);

router.get("/:id/comments", getCommentsForCustomer);
router.post("/:id/comments", protect, addCommentToCustomer);
router.post("/:customerId/comments/:commentId/reply", protect, replyToComment);
router.delete("/:customerId/comments/:commentId",protect, deleteCommentHandler);
router.delete("/:customerId/comments/:commentId/replies/:replyId",protect, deleteReplyHandler);

export default router;
