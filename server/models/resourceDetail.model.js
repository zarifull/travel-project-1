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
      type: [String],
      default: [],
    },
    video: {
      type: [String],
      default: [],
    }, 
  },
  { timestamps: true }
);

export default mongoose.model("ResourceDetail", resourceDetailSchema);
