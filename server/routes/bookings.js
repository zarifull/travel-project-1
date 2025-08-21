import express from 'express';
import {
  createBooking,
  getMyBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getAllBookings,
  updateBookingStatus,
  confirmBooking
} from '../controllers/bookingController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// ====================
// User routes
// ====================
router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.get('/:id', protect, getBookingById);
router.put('/:id', protect, updateBooking);
router.delete('/:id', protect, deleteBooking);

// ====================
// Admin routes
// ====================
router.get('/', protect, isAdmin, getAllBookings);
router.put('/:id/status', protect, isAdmin, updateBookingStatus);
router.patch('/:id/confirm', protect, isAdmin, confirmBooking);

export default router;
