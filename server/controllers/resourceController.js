import Resource from "../models/resource.model.js";

// GET all resources
export const getResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch resources", error });
  }
};

// CREATE a resource safely
export const createResource = async (req, res) => {
  try {
    const { key, count, translations, link } = req.body;
    const image = req.file?.path; 

    // 1️⃣ Check if key is provided
    if (!key) {
      return res.status(400).json({ message: "Resource key is required" });
    }

    // 2️⃣ Check for duplicate key
    const existing = await Resource.findOne({ key });
    if (existing) {
      return res.status(400).json({ message: `Resource with key "${key}" already exists` });
    }

    // 3️⃣ Parse translations safely
    let parsedTranslations = {};
    if (translations) {
      try {
        parsedTranslations = JSON.parse(translations);
      } catch {
        return res.status(400).json({ message: "Translations must be valid JSON" });
      }
    }

    // 4️⃣ Create and save resource
    const resource = new Resource({
      key,
      count,
      translations: parsedTranslations,
      image,
      link,
    });

    await resource.save();
    res.status(201).json(resource);

  } catch (error) {
    res.status(500).json({ message: "Failed to create resource", error });
  }
};

// UPDATE a resource
export const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (req.file) {
      updates.image = req.file.path; // replace Cloudinary image if uploaded
    }

    if (updates.translations) {
      try {
        updates.translations = JSON.parse(updates.translations);
      } catch {
        return res.status(400).json({ message: "Translations must be valid JSON" });
      }
    }

    // Optional: prevent changing key to a duplicate
    if (updates.key) {
      const duplicate = await Resource.findOne({ key: updates.key, _id: { $ne: id } });
      if (duplicate) {
        return res.status(400).json({ message: `Resource key "${updates.key}" already exists` });
      }
    }

    const resource = await Resource.findByIdAndUpdate(id, updates, { new: true });
    if (!resource) return res.status(404).json({ message: "Resource not found" });

    res.json(resource);
  } catch (error) {
    res.status(400).json({ message: "Failed to update resource", error });
  }
};

// DELETE a resource
export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ message: "Resource not found" });

    res.json({ message: "Resource deleted" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete resource", error });
  }
};
