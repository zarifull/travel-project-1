import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import {
  getAdminStats,
  getAllUsers,
  deleteUser,
  promoteToAdmin,
  demoteToUser,
  getAllBookings,
  updateBookingStatus,
  confirmBooking,
  deleteBookingAdmin,
  getAdminSettings,
  updateAdminSettings
} from '../controllers/adminController.js';

const router = express.Router();

// ====================
// Admin dashboard
// ====================
router.get('/dashboard', protect, isAdmin, getAdminStats);
router.get('/',protect,isAdmin,getAdminSettings)
router.put('/',protect,isAdmin,updateAdminSettings)
// ====================
// User management
// ====================
router.get('/users', protect, isAdmin, getAllUsers);
router.put('/promote', protect, isAdmin, promoteToAdmin);
router.put('/demote', protect, isAdmin, demoteToUser);
router.delete('/users/:id', protect, isAdmin, deleteUser);
router.get('/bookings', protect, isAdmin, getAllBookings);
router.put('/:id/status', protect, isAdmin, updateBookingStatus);
router.patch('/:id/confirm', protect, isAdmin, confirmBooking);
router.delete("/:id", protect, isAdmin, deleteBookingAdmin);

export default router;
