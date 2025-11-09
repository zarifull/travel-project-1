import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/Login.css'; 
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";
import axiosInstance from '../../api/axiosInstance'
import { useAuth } from "../../Context/AuthContext";
import { useTranslation } from "react-i18next";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);
const {t} =useTranslation();
  const navigate = useNavigate();
  const { login,user } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) return alert(t("registration.alert.fillFields"));
  
    try {
      const res = await axiosInstance.post("/users/login", {
        email: email.trim(),
        password: password.trim(),
      });
  
      const userData = res.data.user;
      login(userData, res.data.token);
  
      alert(t("registration.alert.success"));
      navigate("/");
    } catch (error) {
      alert(t("registration.alert.failed"));
    }
  };
  

  return (
    <div className="auth-block">
    <div className="auth-page auth-box">
      <h2>{t("registration.login")}</h2>
      <input
        type="text"
        placeholder={t("registration.emailPlaceholder")}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="auth-inp"
      />
      <div style={{ position: "relative" }}>
      <input
        type={showPassword ? "text" : "password"}
        placeholder={t("registration.passwordPlaceholder")}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="auth-inp"
      />
            <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            width: "20%",
            position: "absolute",
            right: 10,
            top: "30%",
            background:'none',
            transform: "translateY(-50%)",
          }}
        >
          <span className="eye-icon">
            {showPassword ? <GoEyeClosed /> : <RxEyeOpen />}
          </span>
        </button>
      </div>
      <button onClick={handleLogin}>{t("registration.login")}</button>
      <p onClick={() => navigate("/signup")}>{t("registration.noAccount")}</p>
      <p onClick={() => navigate("/forgot-password")}>{t("registration.forgotPassword")} ?</p>
    </div>
    </div>
  );
}

export default Login;
