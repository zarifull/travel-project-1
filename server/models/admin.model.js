import mongoose from "mongoose";

const adminSettingsSchema = new mongoose.Schema({
  whatsappNumber: { type: String,
     required: true ,
    trim : true
    },
}, { timestamps: true });

export default mongoose.model("AdminSettings", adminSettingsSchema);
