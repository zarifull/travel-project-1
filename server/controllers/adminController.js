import User from "../models/user.model.js";
import Booking from "../models/booking.model.js";
import Tour from "../models/tour.model.js";
import AdminSettings from '../models/admin.model.js'
import { json } from "express";


export const getAdminStats = async (req, res) => {
  try {
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
    const users = await User.find().select("-password"); 
    res.status(200).json(users);
  } catch (err) {
    console.error("Get users error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const promoteToAdmin = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOneAndUpdate(
      { email },
      { role: "admin" },   
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ updatedUser: user });
  } catch (err) {
    console.error("Promote error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const demoteToUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOneAndUpdate(
      { email },
      { role: "user" },  
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ updatedUser: user });
  } catch (err) {
    console.error("Demote error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    
    await Booking.deleteMany({ userId: user._id });

    await User.findByIdAndDelete(user._id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("tourId", "title price") 
      .populate("userId", "name email");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings", error: err.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }
  try {
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("tourId", "title price").populate("userId", "name email");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Failed to update booking", error: err.message });
  }
};


export const confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = 'confirmed';
    await booking.save();

    res.json({ message: 'Booking confirmed', booking });
  } catch (err) {
    res.status(500).json({ message: 'Error confirming booking' });
  }
};

export const deleteBookingAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    await booking.deleteOne();
    res.status(200).json({ message: "Booking deleted by admin successfully" });
  } catch (err) {
    console.error("Admin delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAdminSettings = async (req, res) => {
  try {
    let settings = await AdminSettings.findOne();

    if (!settings) {
      settings = await AdminSettings.create({ whatsappNumber: "" });
    }

    res.json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch settings" });
  }
};


export const updateAdminSettings = async (req, res) => {
  try {
    const { whatsappNumber } = req.body;

    if (!whatsappNumber || whatsappNumber.trim() === "") {
      return res.status(400).json({ message: "WhatsApp number is required" });
    }

    let settings = await AdminSettings.findOne();

    if (!settings) {
      settings = new AdminSettings({ whatsappNumber });
    } else {
      settings.whatsappNumber = whatsappNumber;
    }

    await settings.save();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: "Failed to update settings" });
  }
};

export const getAdminWhatsApp = async (req, res) => {
  try {
    const settings = await AdminSettings.findOne(); 
    res.json({
      whatsappNumber: settings?.whatsappNumber || "",
    });
  } catch (err) {
    console.error("Failed to get WhatsApp number:", err);
    res.status(500).json({ message: "Failed to load WhatsApp number" });
  }
};

