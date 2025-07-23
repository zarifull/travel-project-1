import express from 'express';
import {
  signupUser, loginUser, resetPassword,
  verifyOtp, sendOtpToEmail, getProfile,
  updateUser, updatePassword
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', signupUser);
router.post('/login', loginUser);
router.post('/forgot-password', sendOtpToEmail);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

// Profile (GET + PUT)
router.get('/me', protect, getProfile);
router.put('/:id', updateUser);
router.put('/password/:id', updatePassword);

export default router;
