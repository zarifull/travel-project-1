import express from 'express';
import {
  signupUser, loginUser, resetPassword,
  verifyOtp, sendOtpToEmail, getProfile,
  updateProfile, updatePassword,
} from '../controllers/userController.js';
import { protect,isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', signupUser);
router.post('/login', loginUser);
router.post('/forgot-password', sendOtpToEmail);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

// Profile (GET + PUT)
router.get('/me', protect, getProfile);
router.put('/profile/:id', protect, updateProfile);      // 🔒 secure update
router.put('/password/:id', protect, updatePassword); // 🔒 secure password update




export default router;
