import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true }, 
    count: { type: Number, required: true }, 
    translations: {
      en: { type: String, required: true }, 
      ru: { type: String, required: true }, 
      kg: { type: String, required: true }, 
    },

    image: { type: String }, 
    link: { type: String },  
  },
  { timestamps: true }
);

export default mongoose.model("Resource", resourceSchema);
