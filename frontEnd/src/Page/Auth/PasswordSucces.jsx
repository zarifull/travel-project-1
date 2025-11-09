import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";
import { useTranslation } from "react-i18next";

function PasswordSuccess() {
  const navigate = useNavigate();
  const {t} =useTranslation();

  return (
    <div className="auth-block">
    <div className="auth-page">
      <div className="success-box">
        <h2>{t("registration.succesTitle")}</h2>
        <p>{t("registration.succesMessage")}</p>
        <button onClick={() => navigate("/login")}>{t("registration.backToLogin")}</button>
      </div>
    </div>
    </div>
  );
}

export default PasswordSuccess;
