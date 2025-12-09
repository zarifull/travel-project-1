import React, { useState } from "react";
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from "react-router-dom";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";
import { useTranslation } from "react-i18next";

function Signup({ setUser }) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword,setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {t} = useTranslation();
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async () => {
    const { name, email, password } = formData;
  
    if (!name || !email || !password) {
      return alert(t("registration.validation.fillFields"));
    }
  
    try {
      const res = await axiosInstance.post("/users/register", {
        name,
        email,
        password,
      });
  
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
  
      alert(t("registration.alert.signupSuccess"));
      navigate("/");
    } catch (error) {
      if (error.response?.data?.message?.toLowerCase().includes("email already exists")) {
        return alert(t("registration.alert.userExists"));
      }
  
      alert(t("registration.alert.signupFailed"));
    }
  };
  
  

  return (
    <div className="auth-block">
    <div className="auth-page">
      <h2>{t("registration.signup")}</h2>
      <input
        type="text"
        placeholder={t("registration.namePlaceholder")}
        name="name"
        onChange={handleChange}
        value={formData.name}
        className="auth-inp"
      />
      <input
        type="email"
        placeholder={t("registration.emailPlaceholder")}
        name="email"
        onChange={handleChange}
        value={formData.email}
        className="auth-inp"
      />
      <div style={{ position: "relative" }}>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder={t("registration.passwordPlaceholder")}
          onChange={handleChange}
          required
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
      
      <button onClick={handleSignup}>{t("registration.signup")}</button>
      <p onClick={() => navigate("/login")}>{t("registration.alreadyHaveAccount")} <br />
       {t("registration.login")}</p>
    </div>
    </div>
  );
}

export default Signup;
