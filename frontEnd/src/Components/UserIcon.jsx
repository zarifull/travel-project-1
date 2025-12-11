import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/UserIcon.css";
import { FaUser } from "react-icons/fa";
import registerImg from "../../src/Assets/register.png";
import userImg from "../Assets/user.png";
import { useTranslation } from "react-i18next";

const UserIcon = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setIsRegisterOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      {user ? (
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <div
            className="avatar"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {(user?.name && user.name[0]?.toUpperCase()) ||
              user?.email?.[0]?.toUpperCase() ||
              "U"}
          </div>

          {isDropdownOpen && (
            <div
              className="modal-backdrop"
              onClick={() => setIsDropdownOpen(false)}
            >
              <div
                className="dropdown"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="close-btn"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  ×
                </button>

                <div className="user-backImg">
                  <img src={userImg} alt="user"/>
                </div>

                <div className="user-info">
                  <strong style={{ color: "#1976d2", fontSize: "1.5rem" }}>
                    {user.name}
                  </strong>
                  <br />
                  <small>{user.email}</small>
                </div>

                <div className="users-links">
                  <Link to="/my-profile" className="user-link">
                    {t("menu.myProfile")}
                  </Link>
                  <Link to="/my-bookings" className="user-link">
                    {t("menu.myBookings")}
                  </Link>

                  <button className="logout-button" onClick={handleLogout}>
                    {t("registration.logout")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div ref={dropdownRef}>
          <button
            className="user-icon"
            onClick={() => setIsRegisterOpen(true)}
            
          >
            <FaUser className="user-icon" />
          </button>

          {isRegisterOpen && (
            <div
              className="modal-backdrop"
              onClick={() => setIsRegisterOpen(false)}
            >
              <div
                className="registerModal-window"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="close-btn"
                  onClick={() => setIsRegisterOpen(false)}
                >
                  ×
                </button>

                <div className="register-img">
                  <img src={registerImg} alt="register"  />
                </div>

                <p className="register-pr">{t("homePage.welcome")}</p>

                <div className="links-block">
                  <Link to="/signup" className="user-link">
                    {t("registration.signup")}
                  </Link>
                  <Link to="/login" className="user-link">
                    {t("registration.login")}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserIcon;
