import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";

function Signup({ setUser }) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword,setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async () => {
    const { name, email, password } = formData;
    if (!name || !email || !password) return alert("Fill in all fields.");
  
    try {
      const res = await axios.post("http://localhost:7070/api/users/register", {
        name,
        email,
        password,
      });
  
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      alert("Signup successful!");
      navigate("/");
    } catch (error) {
      if (error.response?.status === 409) {
        alert("User already exists. Please login or use a different email.");
      } else {
        alert("Signup failed: " + (error.response?.data?.message || "Server error."));
      }
    }
  };
  

  return (
    <div className="auth-block">
    <div className="auth-page">
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        onChange={handleChange}
        value={formData.name}
        className="auth-inp"
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        onChange={handleChange}
        value={formData.email}
        className="auth-inp"
      />
      <div style={{ position: "relative" }}>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
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
      
      <button onClick={handleSignup}>Sign Up</button>
      <p onClick={() => navigate("/login")}>Already have an account? <br />
       Log In</p>
    </div>
    </div>
  );
}

export default Signup;
