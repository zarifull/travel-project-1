import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/ResetPassword.css";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
      const res = await axios.post("http://localhost:7070/api/users/reset-password", {
        email,
        newPassword,
      });

      localStorage.removeItem("resetEmail");
      alert("✅ Password reset successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      console.error("❌ Reset error:", err);
      setMessage(err.response?.data?.message || "Something went wrong.");
    }
  };

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
