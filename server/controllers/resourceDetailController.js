import ResourceDetail from "../models/resourceDetail.model.js";

export const createResourceDetail = async (req, res) => {
  try {
    const { resourceId, name} = req.body;

    if (!resourceId)
      return res.status(400).json({ message: "resourceId is required" });

    const photoUrls = req.files.photo ? req.files.photo.map(file => file.path) : [];
    const videoUrls = req.files.video ? req.files.video.map(file => file.path) : [];

    const newResourceDetail = new ResourceDetail({
      resourceId,
      name: JSON.parse(name),
      photo: photoUrls,
      video: videoUrls, 
    });

    await newResourceDetail.save();

    res.status(201).json({
      message: "ResourceDetail created successfully",
      resourceDetail: newResourceDetail,
    });
  } catch (error) {
    console.error("❌ Error creating ResourceDetail:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message || error.toString(),
    })
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

export const getResourceDetailByResourceId = async (req, res) => {
  try {
    const resourceDetail = await ResourceDetail.findOne({ resourceId: req.params.resourceId });
    if (!resourceDetail)
      return res.status(404).json({ message: "ResourceDetail not found" });
    res.status(200).json(resourceDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateResourceDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const detail = await ResourceDetail.findById(id);
    if (!detail)
      return res.status(404).json({ message: "ResourceDetail not found" });

    const { name } = req.body;
    if (name) detail.name = JSON.parse(name);

    if (req.files && req.files.photo) {
      const newPhotoUrls = req.files.photo.map(file => file.path);
      detail.photo = [...(detail.photo || []), ...newPhotoUrls];
    }

    if (req.files && req.files.video) {
      const newVideoUrls = req.files.video.map(file => file.path);
      detail.video = [...(detail.video || []), ...newVideoUrls];
    }

    await detail.save();

    res.status(200).json({
      message: "ResourceDetail updated successfully",
      resourceDetail: detail,
    });
  } catch (error) {
    console.error("Error updating ResourceDetail:", error);
    res.status(500).json({
      message: "Failed to update ResourceDetail",
      error: error.message,
    });
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

export const deleteResourceDetailPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const { photoUrl } = req.body;

    const detail = await ResourceDetail.findById(id);
    if (!detail) return res.status(404).json({ message: "ResourceDetail not found" });

    detail.photo = detail.photo.filter((url) => url !== photoUrl);
    await detail.save();

    res.json({ message: "Photo deleted successfully", photo: photoUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete photo" });
  }
};

export const deleteVideoFromResourceDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { videoUrl } = req.body;

    const detail = await ResourceDetail.findById(id);
    if (!detail) return res.status(404).json({ message: "ResourceDetail not found" });

    detail.video = detail.video.filter((v) => v !== videoUrl);
    await detail.save();

    res.json({ message: "Video deleted successfully", video: detail.video });
  } catch (error) {
    console.error("❌ Error deleting video:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



