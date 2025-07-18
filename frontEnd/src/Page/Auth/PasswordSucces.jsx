import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";

function PasswordSuccess() {
  const navigate = useNavigate();

  return (
    <div className="auth-block">
    <div className="auth-page">
      <div className="success-box">
        <h2>Password Changed Successfully</h2>
        <p>Your password has been updated.</p>
        <button onClick={() => navigate("/login")}>Back to Login</button>
      </div>
    </div>
    </div>
  );
}

export default PasswordSuccess;
