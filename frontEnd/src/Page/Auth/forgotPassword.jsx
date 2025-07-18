import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) return alert("Please enter your email.");
  
    try {
      await axios.post("http://localhost:7070/api/users/forgot-password", { email });
      localStorage.setItem("resetEmail", email); // ✅ Save for later steps
      alert("OTP sent to your email.");
      navigate("/auth/verify-otp");
    } catch (error) {
      const msg = error.response?.data?.message || "Server error.";
      alert("Error sending OTP: " + msg);
    }
  };
  

  return (
    <div className="auth-block">
    <div className="auth-page">
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name="email"
        className="auth-inp"
      />
      <button onClick={handleSendOtp}>Send OTP</button>
    </div>
    </div>
  );
}

export default ForgotPassword;
