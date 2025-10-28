import CustomerDetail from "../models/customersDetail.model.js";
import mongoose from "mongoose";


export const createCustomer = async (req, res) => {
  try {
    const { resourceDetailId } = req.body;

    if (!resourceDetailId) {
      return res.status(400).json({ message: "resourceDetailId is required" });
    }

    let name = {};
    if (req.body.name) {
      try {
        name = JSON.parse(req.body.name);
      } catch (err) {
        return res.status(400).json({ message: "Invalid JSON format for name" });
      }
    } else {
      return res.status(400).json({ message: "name is required" });
    }

    let comments = [];
    if (req.body.comments) {
      try {
        comments = JSON.parse(req.body.comments);
      } catch (err) {
        comments = [];
      }
    }

    const photoUrls = req.files?.photo ? req.files.photo.map(f => f.path) : [];

    const newCustomer = new CustomerDetail({
      name,
      photo: photoUrls,
      resourceDetailId,
      comments,
    });

    await newCustomer.save();

    res.status(201).json({
      message: "Customer created successfully",
      customer: newCustomer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating customer",
      error: error.message,
    });
  }
};


export const getAllCustomerDetailsByResourceDetail = async (req, res) => {
  try {
    const { resourceDetailId } = req.params;
    const customers = await CustomerDetail.find({ resourceDetailId });

    if (!customers.length) return res.status(404).json({ message: "No customers found" });

    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const getAllCustomers = async (req, res) => {
  try {
    const customers = await CustomerDetail.find().sort({ createdAt: -1 });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers", error: error.message });
  }
};

export const getCustomersByResource = async (req, res) => {
  try {
    const { resourceDetailId } = req.params;
    const customers = await CustomerDetail.find({ resourceDetailId }).sort({ createdAt: -1 });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers by resource", error: error.message });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customer = await CustomerDetail.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customer", error: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.files && req.files.photo) {
      const photos = req.files.photo.map(file => file.path);
      updateData.photo = photos;
    }

    const updated = await CustomerDetail.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: "Customer not found" });

    res.status(200).json({ message: "Customer updated successfully", customer: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating customer", error: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const deleted = await CustomerDetail.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Customer not found" });
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting customer", error: error.message });
  }
};

export const getCommentsForCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await CustomerDetail.findById(id).select("comments");

    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.status(200).json(customer.comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error: error.message });
  }
};

export const addCommentToCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const user = req.user;

    const customer = await CustomerDetail.findById(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    

    const newComment = {
      user: req.user._id,
      username: req.user.name || req.user.email,
      text: {
        en: text?.en || "",
        ru: text?.ru || "",
        kg: text?.kg || "",
      },
    };

    customer.comments.push(newComment);

    await customer.save({ validateModifiedOnly: true });

    res.status(201).json({
      message: "Comment added successfully",
      comments: customer.comments,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({
      message: "Error adding comment",
      error: error.message,
    });
  }
};


export const replyToComment = async (req, res) => {
  try {
    const { customerId, commentId } = req.params;
    const { text } = req.body;

    // console.log("REQ.USER:", req.user);
    // console.log("REQ.BODY:", req.body);

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!text || (!text.en && !text.ru && !text.kg)) {
      return res.status(400).json({ message: "Reply text is required in at least one language." });
    }

    const customer = await CustomerDetail.findById(customerId);
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    const comment = customer.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const newReply = {
      user: req.user._id,
      username: req.user.name || req.user.email || "Anonymous",
      text: {
        en: text.en || "",
        ru: text.ru || "",
        kg: text.kg || "",
      },
      createdAt: new Date(),
    };

    comment.replies.push(newReply);
    await customer.save({ validateModifiedOnly: true });

    res.status(201).json({
      message: "Reply added successfully",
      comments: customer.comments,
    });
  } catch (error) {
    console.error("Error replying to comment:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


export const deleteCommentHandler = async (req, res) => {
  try {
    const { customerId, commentId } = req.params;
    const customer = await CustomerDetail.findById(customerId);
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    const comment = customer.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // console.log("req.user:", req.user);
    // console.log("comment.user:", comment.user);

    if (
      req.user.role !== "admin" && 
      req.user.id.toString() !== comment.user.toString()
    ) {
      return res.status(403).json({ message: "Forbidden: You can only delete your own comment" });
    }       

    comment.deleteOne();
    await customer.save({ validateBeforeSave: false });

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

export const deleteReplyHandler = async (req, res) => {
  try {
    const { customerId, commentId, replyId } = req.params;
    const customer = await CustomerDetail.findById(customerId);
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    const comment = customer.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const reply = comment.replies.id(replyId);
    if (!reply) return res.status(404).json({ message: "Reply not found" });

    // console.log("req.user:", req.user);
    // console.log("reply.user:", reply.user);

    if (
      req.user.role !== "admin" && 
      req.user.id.toString() !== reply.user.toString()
    ) {
      return res.status(403).json({ message: "Forbidden: You can only delete your own reply" });
    }

    reply.deleteOne();
    await customer.save({ validateBeforeSave: false });

    res.status(200).json({ message: "Reply deleted successfully" });
  } catch (err) {
    console.error("Error deleting reply:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};










