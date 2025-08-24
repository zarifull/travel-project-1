// controllers/userController.js
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import transporter from '../utils/mailer.js';
import sendOtp from '../utils/sendOtp.js';
import isEmailDomainValid from '../utils/validateEmailDomain.js'; // Email checker (if you use it)

const JWT_SECRET = process.env.JWT_SECRET || "your_fallback_secret";

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || "your_secret_key",
    { expiresIn: "7d" }
  );
};

// ================== SIGNUP ==================
export const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 2. (Optional) Validate email domain
    const isValidDomain = await isEmailDomainValid(email);
    if (!isValidDomain) {
      return res.status(400).json({ message: "Invalid email domain" });
    }

    // 3. Create new user (password is hashed automatically in pre-save)
    const newUser = new User({ name, email, password });
    await newUser.save();

    // 4. Generate token
    const token = generateToken(newUser);

    // 5. Respond
    res.status(201).json({
      message: "Signup successful",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

// ================== LOGIN ==================
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3. Generate token
    const token = generateToken(user);

    // 4. Respond
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};


export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
export const getMe = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // get token
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify token
    const user = await User.findById(decoded.id); // check if user exists
    if (!user) return res.status(401).json({ message: "User not found" });

    res.json(user); // send user data
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.username, // ✅ map 'username' from frontend to 'name' in DB
        email: req.body.email,
      },
      { new: true }
    );

    res.status(200).json({ updatedUser });
  } catch (error) {
    console.error("❌ Failed to update user:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = password; // ✅ plain text is okay here, because save() will hash it
    await user.save();        // ✅ triggers your pre-save hook

    res.json({ message: "✅ Password updated successfully" });
  } catch (err) {
    console.error("❌ Password update error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const sendOtpToEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found with this email" });

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "🔐 Your OTP Code",
      text: `Hi ${user.name},\n\nYour OTP code is: ${otp}\nIt expires in 10 minutes.\n\nThanks, Journey App Team`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ message: "Failed to send OTP email" });
  }
};


export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user.email);
    console.log("User.otp:", user.otp);
    console.log("User.otpExpires:", user.otpExpires);
    console.log("Provided OTP:", otp);

    if (
      !user.otp ||
      user.otp !== otp ||
      !user.otpExpires ||
      user.otpExpires < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error("❌ OTP verify error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = newPassword;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "✅ Password reset successful" });
  } catch (err) {
    console.error("Reset error:", err);
    res.status(500).json({ message: "Failed to reset password" });
  }

};

