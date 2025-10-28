import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true }, 
  text: { en: String, ru: String, kg: String }
}, { timestamps: true });

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true }, 
  text: { en: String, ru: String, kg: String },
  replies: [replySchema]
}, { timestamps: true });


const customerDetailSchema = new mongoose.Schema(
  {
    resourceDetailId: { type: mongoose.Schema.Types.ObjectId, ref: "ResourceDetail", required: true },
    name: {
      en: { type: String, required: true },
      ru: { type: String, default: "" },
      kg: { type: String, default: "" },
    },
    photo: [String],
    comments: [commentSchema],
  },
  { timestamps: true }
);

export default mongoose.model("CustomerDetail", customerDetailSchema);
