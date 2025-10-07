import ResourceDetail from "../models/resourceDetail.model.js";

export const createResourceDetail = async (req, res) => {
  try {
    const { resourceId, name, comment, logoAlt } = req.body;

    if (!resourceId) return res.status(400).json({ message: "resourceId is required" });

    console.log("FILES RECEIVED:", req.files);

    const photoUrls = req.files.photo ? req.files.photo.map(file => file.path) : [];

    // const photoUrls = req.files.map(file=>file.path);

    const logoUrl = req.files.logo ? req.files.logo[0].path : "";

    const newResourceDetail = new ResourceDetail({
      resourceId,
      name: JSON.parse(name),
      comment: JSON.parse(comment),
      photo: photoUrls,
      logo: {
        url: logoUrl,
        alt: logoAlt ? JSON.parse(logoAlt) : { en: "", ru: "", kg: "" },
      },
    });

    await newResourceDetail.save();

    res.status(201).json({
      message: "ResourceDetail created successfully",
      resourceDetail: newResourceDetail,
    });
  } catch (error) {
    console.error("Error creating ResourceDetail:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET all ResourceDetails
export const getAllResourceDetails = async (req, res) => {
  try {
    const resourceDetails = await ResourceDetail.find().populate("resourceId");
    res.status(200).json(resourceDetails);
  } catch (error) {
    console.error("Error fetching ResourceDetails:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET single ResourceDetail by ID
export const getResourceDetailById = async (req, res) => {
  try {
    const resourceDetail = await ResourceDetail.findById(req.params.id).populate("resourceId");
    if (!resourceDetail) return res.status(404).json({ message: "ResourceDetail not found" });
    res.status(200).json(resourceDetail);
  } catch (error) {
    console.error("Error fetching ResourceDetail:", error);
    res.status(400).json({ message: error.message });
  }
};

// UPDATE ResourceDetail
export const updateResourceDetail = async (req, res) => {
  try {
    const detail = await ResourceDetail.findById(req.params.id);
    if (!detail) return res.status(404).json({ message: "ResourceDetail not found" });

    const { name, comment, logoAlt } = req.body;

    // Update multilingual fields
    if (name) detail.name = JSON.parse(name);
    if (comment) detail.comment = JSON.parse(comment);
    if (logoAlt) detail.logo.alt = JSON.parse(logoAlt);

    // Append new customer photos
    if (req.files.photo) {
      const newPhotoUrls = req.files.photo.map(file => file.path);
      detail.photo = [...detail.photo, ...newPhotoUrls];
    }

    // Replace logo if new one uploaded
    if (req.files.logo) {
      detail.logo.url = req.files.logo[0].path;
    }

    await detail.save();

    res.status(200).json({
      message: "ResourceDetail updated successfully",
      resourceDetail: detail,
    });
  } catch (error) {
    console.error("Error updating ResourceDetail:", error);
    res.status(500).json({ message: "Failed to update ResourceDetail", error: error.message });
  }
};

// DELETE ResourceDetail
export const deleteResourceDetail = async (req, res) => {
  try {
    const deleted = await ResourceDetail.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "ResourceDetail not found" });
    res.status(200).json({ message: "ResourceDetail deleted successfully" });
  } catch (error) {
    console.error("Error deleting ResourceDetail:", error);
    res.status(400).json({ message: error.message });
  }
};
