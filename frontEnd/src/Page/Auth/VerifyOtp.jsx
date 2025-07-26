import React, { useState, useEffect } from "react";
import axiosInstance from '../../api/axiosInstance';
import "../../styles/VerifyOtp.css";
import { useNavigate } from "react-router-dom";

function VerifyOtp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/users/verify-otp", {
        email,
        otp,
      });

      alert("✅ OTP verified! You can now reset your password.");
      navigate("/auth/reset-password");
    } catch (err) {
      console.error("❌ OTP verify error:", err);
      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Something went wrong.");
      }
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("resetEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      alert("⚠️ No email found. Please go back and enter your email.");
      navigate("/auth/forgot-password");
    }
  }, []);
  
  

  return (
    <div className="auth-block">
    <div className="verify-otp-container">
      <h2>🔐 Verify OTP</h2>
      <form onSubmit={handleVerify} className="verify-form">
        <label>Email</label>
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>OTP</label>
        <input
          type="text"
          value={otp}
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button type="submit">Verify OTP</button>
      </form>

      {message && <p className="verify-message">{message}</p>}
    </div>
    </div>
  );
}

export default VerifyOtp;
