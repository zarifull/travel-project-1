import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true }, 
    // e.g. "employers", "partners", "customers"

    count: { type: Number, required: true }, 
    // e.g. 20, 200, etc.

    translations: {
      en: { type: String, required: true }, // Employers
      ru: { type: String, required: true }, // Работодатели
      kg: { type: String, required: true }, // Иш берүүчүлөр
    },

    image: { type: String }, // Cloudinary URL for icon/logo
    link: { type: String },  // Optional: "Learn more" URL
  },
  { timestamps: true }
);

export default mongoose.model("Resource", resourceSchema);
