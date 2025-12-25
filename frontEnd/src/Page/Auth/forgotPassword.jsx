import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";
import { useTranslation } from "react-i18next";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!email) return alert(t("registration.validation.invalidEmail"));
  
    setLoading(true); 
    try {
      await axiosInstance.post("/users/forgot-password", { email });
      localStorage.setItem("resetEmail", email);
      
      alert(t("registration.alert.otpSent")); 
      
      navigate("/auth/verify-otp");
    } catch (error) {
      const backendMsg = error.response?.data?.message;
      let translatedMsg = "";
  
      if (backendMsg === "Failed to send OTP email") {
        translatedMsg = t("registration.alert.failedToSendOtp");
      } else {
        translatedMsg = backendMsg || t("registration.alert.serverError");
      }
  
      alert(t("registration.alert.errorsendingOtp") + ": " + translatedMsg);
    } finally {
      setLoading(false); 
    }
  };
  
  return (
    <div className="auth-block">
    <div className="auth-page">
      <h2>{t("registration.forgotPassword")}</h2>
      <input
        type="email"
        placeholder={t("registration.emailPlaceholder")}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name="email"
        className="auth-inp"
      />
      <button onClick={handleSendOtp}>{t("registration.sendOtp")}</button>
    </div>
    </div>
  );
}

export default ForgotPassword;
