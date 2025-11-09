import React, { useState, useEffect } from "react";
import axiosInstance from '../../api/axiosInstance';
 import "../../styles/ResetPassword.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useTranslation } from "react-i18next";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const {t}=useTranslation();

  const { user,otp,login } = useAuth();
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

    if (newPassword.length < 6) {
      return setMessage("Password must be at least 6 characters.");
    }

    try {
      const res = await axiosInstance.post("/users/reset-password", {
        email,
        newPassword,
        otp
      });
      
      if (res.data.user && res.data.token) {
        login(res.data.user, res.data.token); 
      }

      alert("✅ Password reset successful! You can now log in.");
      console.log("Resetting password for:", email);
      navigate("/login");
    } catch (err) {
      console.error("❌ Reset error:", err);
      setMessage(err.response?.data?.message || "Something went wrong.");
    }
    
  };




  return (
    <div className="auth-block">
    <div className="reset-password-container">
      <h2>{t("registration.resetTitle")}</h2>
      <form onSubmit={handleReset} className="reset-form">
        <input type="hidden" value={email} readOnly />

        <label>{t("registration.newPasswordLabel")}</label>
        <input
          type="password"
          value={newPassword}
          placeholder={t("registration.passwordPlaceholder")}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button type="submit">{t("registration.resetPassword")}</button>
      </form>

      {message && <p className="reset-message">{message}</p>}
    </div>
    </div>
  );
}

export default ResetPassword;
