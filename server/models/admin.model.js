import mongoose from "mongoose";

const adminSettingsSchema = new mongoose.Schema({
  whatsappNumber: { type: String, required: true },
  // you can add more settings later
}, { timestamps: true });

export default mongoose.model("AdminSettings", adminSettingsSchema);
