// controllers/userController.js
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendOtp from '../utils/sendOtp.js';
import transporter from "../utils/mailer.js";

const JWT_SECRET = process.env.JWT_SECRET;


export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // ✅ Check if email domain is real
  const isValidEmail = await isEmailDomainValid(email);
  if (!isValidEmail) {
    return res.status(400).json({ message: "Please use a real email domain." });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

 
  const token = jwt.sign({ id: newUser._id }, "secret_key", {
    expiresIn: "1d",
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
    token,
  });
};



export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate fields
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
   
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    console.log("Password mismatch for email:", email);
    return res.status(401).json({ message: "Invalid credentials" });
  }
  

  // Generate token
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
  res.status(200).json({
    message: 'Login successful',
    user: { id: user._id, 
                name: user.name,
                email: user.email },
    token,
  });
  console.log("Login attempt with:", email, password);

};


const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString(); // Always 4 digits
};

export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  // Validate input
  if (!email || !newPassword) {
    return res.status(400).json({ message: "Email and new password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password & clear any residual OTP
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("❌ Error resetting password:", error);
    res.status(500).json({ message: "Failed to reset password" });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.otp || !user.otpExpires) {
      return res.status(400).json({ message: 'No OTP found. Request a new one.' });
    }
    
    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }    
       
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
  console.log("🔍 Verifying OTP:", { received: otp, saved: user.otp });
  console.log("Received email:", email);
  console.log("Received OTP:", otp);
  
};

export const sendOtpToEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found with this email" });
    }

    const otp = generateOTP(); // Your 4-digit function
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "🔐 Your OTP Code",
      text: `Hi ${user.name},\n\nYour OTP code is: ${otp}\nIt will expire in 10 minutes.\n\nThanks,\nJourney App Team`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📤 Real email sent to ${email}`);

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ message: "Failed to send OTP email" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
