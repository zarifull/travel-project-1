import express from 'express';
import {
  signupUser, loginUser, resetPassword,
  verifyOtp, sendOtpToEmail, getProfile,
  updateUser, updatePassword
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
router.put('/profile/:id', updateUser);         // for updating name/email
router.put('/password/:id', updatePassword);    // for updating password


export default router;
