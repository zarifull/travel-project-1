import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: { type: String, required: true }, 
    text: {
      en: { type: String, default: "" },
      ru: { type: String, default: "" },
      kg: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

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
      type: [String],
      default: [],
    },
    logo: {
      url: { type: String, default: "" },
      alt: {
        en: { type: String, default: "" },
        ru: { type: String, default: "" },
        kg: { type: String, default: "" },
      },
    },
    video: {
      type: [String],
      default: [],
    },
    comment: {
      en: String,
      ru: String,
      kg: String,
    },
    comments: [commentSchema], 
  },
  { timestamps: true }
);

export default mongoose.model("ResourceDetail", resourceDetailSchema);
