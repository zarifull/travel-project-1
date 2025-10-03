import mongoose from 'mongoose';

const LocalizedString = new mongoose.Schema({
  en: { type: String, default: '' },
  ru: { type: String, default: '' },
  kg: { type: String, default: '' },
}, { _id: false });

const PartnerSchema = new mongoose.Schema({
  name: LocalizedString,
  description: LocalizedString,
  logoUrl: { type: String, default: '' }, 
  website: { type: String, default: '' },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Partner', PartnerSchema);
