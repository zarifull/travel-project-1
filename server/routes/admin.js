// routes/adminRoutes.js
import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import User from '../models/user.model.js';
import Tour from '../models/tour.model.js';
import Booking from '../models/booking.model.js';

const router = express.Router();

router.get('/dashboard', protect, isAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTours = await Tour.countDocuments();
    const totalBookings = await Booking.countDocuments();

    res.json({
      totalUsers,
      totalTours,
      totalBookings,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch dashboard stats' });
  }
});

export default router;
