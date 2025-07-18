import express from 'express';
import {
  createBooking,
  getMyBookings,
  getBookingById,
  updateBooking,
  deleteBooking
} from '../controllers/bookingController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, createBooking);
router.get('/my', verifyToken, getMyBookings);
router.get('/:id', verifyToken, getBookingById);
router.put('/:id', verifyToken, updateBooking);
router.delete('/:id', verifyToken, deleteBooking);

export default router;
