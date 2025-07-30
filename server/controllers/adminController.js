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
