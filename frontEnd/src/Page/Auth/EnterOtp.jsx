import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/Login.css";

function EnterOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleVerify = async () => {
    if (!otp || !email) return alert("Missing OTP or email.");
    
    try {
      await axios.post("http://localhost:7070/api/users/verify-otp", { email, otp });
      alert("OTP verified. You can now reset your password.");
      navigate("/password-success");
    } catch (error) {
      alert("OTP verification failed: " + error.response?.data?.message || "Server error.");
    }
    console.log("Sending:", { email, otp });

  };

  return (
    <div className="auth-block">
    <div className="auth-page">
      <h2>Enter OTP</h2>
      <input
        type="text"
        placeholder="Enter 4-digit code"
        maxLength={4}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerify}>Verify</button>
    </div>
    </div>
  );
}

export default EnterOtp;
