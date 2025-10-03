import Partner from '../models/partner.model.js';
import cloudinary from 'cloudinary';
import fs from 'fs';

// configure cloudinary using env variables
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const createPartner = async (req, res) => {
  try {
    const {
      nameEn, nameRu, nameKg,
      descEn, descRu, descKg,
      website
    } = req.body;

    let logoUrl = '';
    if (req.file) {
      // upload local file saved by multer to Cloudinary
      const uploadRes = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'partners' });
      logoUrl = uploadRes.secure_url;
      // remove local file
      fs.unlink(req.file.path, () => {});
    }

    const partner = new Partner({
      name: { en: nameEn, ru: nameRu, kg: nameKg },
      description: { en: descEn, ru: descRu, kg: descKg },
      logoUrl,
      website
    });

    await partner.save();
    res.status(201).json(partner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const getPartners = async (req, res) => {
  try {
    const lang = req.query.lang || 'en';
    const partners = await Partner.find({ active: true }).sort({ createdAt: -1 });
    // Return both raw and localized - frontend can use whichever
    const result = partners.map(p => ({
      _id: p._id,
      name: p.name,
      description: p.description,
      localizedName: p.name[lang] || p.name.en,
      localizedDescription: p.description[lang] || p.description.en,
      logoUrl: p.logoUrl,
      website: p.website,
      createdAt: p.createdAt
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPartner = async (req, res) => {
  try {
    const p = await Partner.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePartner = async (req, res) => {
  try {
    const p = await Partner.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });

    const {
      nameEn, nameRu, nameKg,
      descEn, descRu, descKg,
      website, active
    } = req.body;

    if (req.file) {
      const uploadRes = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'partners' });
      p.logoUrl = uploadRes.secure_url;
      fs.unlink(req.file.path, () => {});
    }

    p.name = { en: nameEn || p.name.en, ru: nameRu || p.name.ru, kg: nameKg || p.name.kg };
    p.description = { en: descEn || p.description.en, ru: descRu || p.description.ru, kg: descKg || p.description.kg };
    p.website = website ?? p.website;
    if (typeof active !== 'undefined') p.active = active;

    await p.save();
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePartner = async (req, res) => {
  try {
    await Partner.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
