import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Booking from "./booking.model.js"; // ✅ Add this

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  phone :{
    type : String,
  },
  otp: String,
  otpExpires: Date,
}, { timestamps: true });

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Cascade delete bookings when a user is deleted
userSchema.pre("findOneAndDelete", async function (next) {
  const userId = this.getQuery()["_id"];
  await Booking.deleteMany({ userId }); // ✅ Now Booking is defined
  next();
});


const admins = await User.find({ role: "admin" });
const adminPhones = admins.map(a => a.phone).filter(Boolean);

// Example: Loop through and send WhatsApp message
for (const phone of adminPhones) {
  // sendMessageToWhatsApp(phone, bookingDetails);
}


const User = mongoose.model("User", userSchema);
export default User;

