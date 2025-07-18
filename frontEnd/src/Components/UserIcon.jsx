import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/UserIcon.css"; 
import { FaUser } from "react-icons/fa";

const UserIcon = () => {
  const [isRegister, setRegister] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const { user, logout } = useAuth(); // ✅ use `logout` from context

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setRegister(false);
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout(); // ✅ use context logout
    navigate("/login");
  };

  return (
    <div className="navbar">
      {user ? (
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <div className="avatar" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {user.name?.[0]?.toUpperCase() || "U"}
          </div>

          {isDropdownOpen && (
            <div className="dropdown">
              <div className="user-info">
                <strong style={{ color: '#1976d2' }}>{user.name}</strong><br />
                <small>{user.email}</small>
              </div>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <menu className="register-modal">
          <button className="user-icon">
            <FaUser onClick={() => setRegister(!isRegister)} className="user-icon" />
            {isRegister && (
              <div className="menu-dropdown">
                <Link to='/signup' className='menu-links'>SIGNUP</Link>
                <Link to='/login' className='menu-links'>LOGIN</Link>
              </div>
            )}
          </button>
        </menu>
      )}
    </div>
  );
};

export default UserIcon;
