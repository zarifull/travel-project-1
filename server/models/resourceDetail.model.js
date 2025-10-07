import mongoose from "mongoose";

const resourceDetailSchema = new mongoose.Schema(
  {
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
      required: true,
    },
    name: {
      en: String,
      ru: String,
      kg: String,
    },
    photo: {
      type: [String], // array of URLs for customer photos
      default: [],
    },
    logo: {
      url: { type: String, default: "" }, // single logo
      alt: {
        en: { type: String, default: "" },
        ru: { type: String, default: "" },
        kg: { type: String, default: "" },
      },
    },
    comment: {
      en: String,
      ru: String,
      kg: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ResourceDetail", resourceDetailSchema);
