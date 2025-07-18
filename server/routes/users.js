// routes/userRoutes.js
import express from 'express';
import { registerUser, loginUser, 
    sendOtpToEmail, resetPassword,verifyOtp, getProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post("/forgot-password", sendOtpToEmail);
router.post("/reset-password", resetPassword);
router.post("/verify-otp",verifyOtp);
router.get('/profile', protect, getProfile);

router.get("/test", (req, res) => {
    res.send("User route working ✅");
    console.log("Hi from SERVER");
  });
  

export default router;
