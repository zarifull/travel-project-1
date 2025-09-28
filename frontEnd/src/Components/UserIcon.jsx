import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/UserIcon.css"; 
import { FaUser } from "react-icons/fa";
import register from '../../src/Assets/register.png';
import { useTranslation } from "react-i18next";
import userImg from '../Assets/user.png';


const UserIcon = () => {
  const [isRegister, setRegister] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation();


  const { user, logout,token } = useAuth(); // ✅ use `logout` from context

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
  // console.log("👤 UserIcon user:", user);
  // console.log("✅ AuthContext user:", user);
  // console.log("✅ AuthContext token:", token);

  return (
<div className="navbar">
  {user ? (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      <div className="avatar" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {(user?.name && user.name[0]?.toUpperCase()) || user?.email?.[0]?.toUpperCase() || "U"}
      </div>

      {isDropdownOpen && (
        <div className="dropdown">
          <button className="close-btn" onClick={() => setIsDropdownOpen(false)}>×</button>
        
          <div className="user-backImg">
            <img src={userImg} alt="user" style={{ width: '70%' }} />
          </div>

          <div className="user-info">
            <strong style={{ color: '#1976d2',fontSize:'1.5rem' }}>{user.name}</strong><br />
            <small>{user.email}</small>
          </div>
          <div className="users-links">
          <Link to='/my-profile' className='user-link'>{t("menu.myProfile")}</Link>
          <Link to='/my-bookings' className='user-link'>{t("menu.myBookings")}</Link>
          <button className="logout-button" style={{textAlign:'right'}} onClick={handleLogout}>
            {t("registration.logout")}
          </button>
          </div>
          
        </div>
      )}
    </div>
  ) : (
    <div className="register-modal">
      <button className="user-icon">
        <FaUser onClick={() => setRegister(!isRegister)} className="user-icon" />
      </button>

      {isRegister && (
        <div className="registerModal-window">
          {/* ✅ Close register modal */}
          <button className="close-btn" onClick={() => setRegister(false)}>×</button>

          <div className="register-img">
            <img src={register} alt="" style={{ width: '60%' }} />
          </div>

          <p className="register-pr">{t("homePage.welcome")}</p>

          <div className="links-block">
            <Link to='/signup' className='user-link'>{t("registration.signup")}</Link>
            <Link to='/login' className='user-link'>{t("registration.login")}</Link>
          </div>
        </div>
      )}
    </div>
  )}
</div>

  );
};

export default UserIcon;
