import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../../styles/Login.css'; 
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return alert("Fill in all fields.");

    try {
      const res = await axios.post("http://localhost:7070/api/users/login", {
        email,
        password,
      });
      console.log("Password",password);
      console.log("Email",email);


      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      alert("Login successful!");
      navigate("/"); // Go to homepage or dashboard
    } catch (error) {
      alert("Login failed: " + error.response?.data?.message || "Server error.");
    }
  };

  return (
    <div className="auth-block">
    <div className="auth-page auth-box">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="auth-inp"
      />
            <div style={{ position: "relative" }}>
      <input
        type="password"
        placeholder="Password"
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
      <button onClick={handleLogin}>Login</button>
      <p onClick={() => navigate("/signup")}>Don't have an account? Sign Up</p>
      <p onClick={() => navigate("/forgot-password")}>Forgot password?</p>
    </div>
    </div>
  );
}

export default Login;
