import Resource from "../models/resource.model.js";

export const getResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch resources", error });
  }
};

export const createResource = async (req, res) => {
  try {
    const { key, count, translations, link } = req.body;
    const image = req.file?.path; 

    if (!key) {
      return res.status(400).json({ message: "Resource key is required" });
    }

    const existing = await Resource.findOne({ key });
    if (existing) {
      return res.status(400).json({ message: `Resource with key "${key}" already exists` });
    }

    let parsedTranslations = {};
    if (translations) {
      try {
        parsedTranslations = JSON.parse(translations);
      } catch {
        return res.status(400).json({ message: "Translations must be valid JSON" });
      }
    }

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

export const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (req.file) {
      updates.image = req.file.path;
    }

    if (updates.translations) {
      try {
        updates.translations = JSON.parse(updates.translations);
      } catch {
        return res.status(400).json({ message: "Translations must be valid JSON" });
      }
    }

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

export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ message: "Resource not found" });

    res.json({ message: "Resource deleted" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete resource", error });
  }
};
