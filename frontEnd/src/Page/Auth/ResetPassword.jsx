import React, { useState, useEffect } from "react";
import axiosInstance from '../../api/axiosInstance';
 import "../../styles/ResetPassword.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  const { user,otp,login } = useAuth();
  // ✅ Check localStorage on mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      alert("⚠️ No email found. Please verify OTP first.");
      navigate("/auth/verify-otp");
    }
  }, [navigate]);

  const handleReset = async (e) => {
    e.preventDefault();

    // ✅ Move validation check here
    if (newPassword.length < 6) {
      return setMessage("Password must be at least 6 characters.");
    }

    try {
      const res = await axiosInstance.post("/users/reset-password", {
        email,
        newPassword,
        otp
      });
      
      // ✅ Save user and token if returned
      if (res.data.user && res.data.token) {
        login(res.data.user, res.data.token); // from useAuth()
      }
      // console.log("Saved user after password reset:", res.data.user);

      // localStorage.removeItem("resetEmail");
      // localStorage.removeItem("token"); // 🧼 cleanup
      // localStorage.removeItem("user");  // optional

      alert("✅ Password reset successful! You can now log in.");
      console.log("Resetting password for:", email);
      navigate("/login");
    } catch (err) {
      console.error("❌ Reset error:", err);
      setMessage(err.response?.data?.message || "Something went wrong.");
    }
    
  };


// console.log("Saved user after password reset:", user);


  return (
    <div className="auth-block">
    <div className="reset-password-container">
      <h2>🔐 Reset Your Password</h2>
      <form onSubmit={handleReset} className="reset-form">
        <input type="hidden" value={email} readOnly />

        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          placeholder="Enter your new password"
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button type="submit">Reset Password</button>
      </form>

      {message && <p className="reset-message">{message}</p>}
    </div>
    </div>
  );
}

export default ResetPassword;
