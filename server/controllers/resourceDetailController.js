import ResourceDetail from "../models/resourceDetail.model.js";

export const createResourceDetail = async (req, res) => {
  try {
    const { resourceId, name, comment, logoAlt } = req.body;

    if (!resourceId)
      return res.status(400).json({ message: "resourceId is required" });

    console.log("FILES RECEIVED:", req.files);

    const photoUrls = req.files.photo ? req.files.photo.map(file => file.path) : [];
    const logoUrl = req.files.logo ? req.files.logo[0].path : "";

    const videoUrls = req.files.video ? req.files.video.map(file => file.path) : [];

    const newResourceDetail = new ResourceDetail({
      resourceId,
      name: JSON.parse(name),
      comment: JSON.parse(comment),
      photo: photoUrls,
      logo: {
        url: logoUrl,
        alt: logoAlt ? JSON.parse(logoAlt) : { en: "", ru: "", kg: "" },
      },
      video: videoUrls, 
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


export const getAllResourceDetails = async (req, res) => {
  try {
    const resourceDetails = await ResourceDetail.find().populate("resourceId");
    res.status(200).json(resourceDetails);
  } catch (error) {
    console.error("Error fetching ResourceDetails:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

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

export const updateResourceDetail = async (req, res) => {
  try {
    const detail = await ResourceDetail.findById(req.params.id);
    if (!detail) return res.status(404).json({ message: "ResourceDetail not found" });

    const { name, comment, logoAlt } = req.body;

    if (name) detail.name = JSON.parse(name);
    if (comment) detail.comment = JSON.parse(comment);
    if (logoAlt) detail.logo.alt = JSON.parse(logoAlt);

    if (req.files.photo) {
      const newPhotoUrls = req.files.photo.map(file => file.path);
      detail.photo = [...detail.photo, ...newPhotoUrls];
    }

    if (req.files.logo) {
      detail.logo.url = req.files.logo[0].path;
    }

 
    if (req.files.video) {
      const newVideoUrls = req.files.video.map(file => file.path);
      detail.video = [...detail.video, ...newVideoUrls];
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

export const addCommentToResourceDetail = async (req, res) => {
  try {
    const { id } = req.params; 
    const { user, text } = req.body; // text can be string or object

    const resourceDetail = await ResourceDetail.findById(id);
    if (!resourceDetail) {
      return res.status(404).json({ message: "ResourceDetail not found" });
    }

    // Ensure text is always an object with en/ru/kg strings
    let parsedText = { en: "", ru: "", kg: "" };

    if (typeof text === "string") {
      parsedText.en = text;
    } else if (typeof text === "object" && text !== null) {
      parsedText.en = text.en || "";
      parsedText.ru = text.ru || "";
      parsedText.kg = text.kg || "";
    }

    resourceDetail.comments.push({ user, text: parsedText });
    await resourceDetail.save();

    res.status(201).json({
      message: "✅ Comment added successfully",
      comments: resourceDetail.comments,
    });
  } catch (error) {
    console.error("❌ Error adding comment:", error);
    res.status(500).json({
      message: "Failed to add comment",
      error: error.message,
    });
  }
};

export const getCommentsForResourceDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const resourceDetail = await ResourceDetail.findById(id).select("comments");

    if (!resourceDetail) {
      return res.status(404).json({ message: "ResourceDetail not found" });
    }

    res.status(200).json(resourceDetail.comments);
  } catch (error) {
    console.error("❌ Error fetching comments:", error);
    res.status(500).json({
      message: "Failed to fetch comments",
      error: error.message,
    });
  }
};
