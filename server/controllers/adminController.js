// controllers/admin.controller.js
import User from "../models/user.model.js";
import Booking from "../models/booking.model.js";
import Tour from "../models/tour.model.js";

/**
 * @desc   Get total counts for dashboard
 * @route  GET /api/admin/stats
 * @access Private/Admin
 */
export const getAdminStats = async (req, res) => {
  try {
    // Use Promise.all for parallel execution → faster
    const [totalUsers, totalBookings, totalTours] = await Promise.all([
      User.countDocuments(),
      Booking.countDocuments(),
      Tour.countDocuments(),
    ]);

    res.status(200).json({
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
    const users = await User.find().select("-password"); // ✅ correct way
    res.status(200).json(users);
  } catch (err) {
    console.error("Get users error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc   Promote a user to admin
 * @route  PUT /api/admin/promote
 * @access Private/Admin
 */
export const promoteToAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOneAndUpdate(
      { email },
      { role: "admin", isAdmin: true },
      { new: true, select: "-password" } // return updated user without password
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User promoted to admin",
      updatedUser: user,
    });
  } catch (err) {
    console.error("Promote error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const demoteToUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isAdmin = false;
    await user.save();

    res.json({ updatedUser: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Demotion failed" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};
