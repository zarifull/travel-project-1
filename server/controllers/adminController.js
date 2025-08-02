import User from "../models/user.model.js";
import Booking from "../models/booking.model.js";
import Tour from "../models/tour.model.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalTours = await Tour.countDocuments();

    res.json({
      message: "Admin dashboard stats",
      totalUsers,
      totalBookings,
      totalTours,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const promoteToAdmin = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { role: "admin", isAdmin: true }, // ✅ also set isAdmin to true
      { new: true }
    );    
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User promoted to admin", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
};
