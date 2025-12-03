import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";
import logo from "../Assets/logotip.png";
import "../styles/Header.css";
import UserIcon from "./UserIcon";
import { useAuth } from "../Context/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSw";

function Header() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { t } = useTranslation();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { to: "/", label: t("header.home") },
    { to: "/tour-list", label: t("header.tours") },
    { to: "/about-us", label: t("header.aboutUs") },
    { to: "/contacts", label: t("header.contact") },
  ];

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar" ref={menuRef}>
          <Link to="/" className="logo-block" aria-label="Home">
            <img src={logo} alt="Batken Travels Logo" className="logo" />
            <span className="logo-text">Batken Travels</span>
          </Link>

          <div className="right-side">
          <div className="nav-right desktop-only">
          <div className="lang-desktop">
            <LanguageSwitcher compact={true} />
          </div>

            {user?.role === "admin" && (
              <Link to="/admin/dashboard" className="admin-btn" title="Admin Panel">
                <MdAdminPanelSettings />
              </Link>
            )}

            
          </div>
          <UserIcon />
          <button
            className="menu-toggle "
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? "✕" : <FiMenu />}
          </button>
       
          <div className={`dropdown-menu  ${isOpen ? "open" : ""}`} >
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="dropdown-link "
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}

          <div className="lang-mobile ">
              <LanguageSwitcher compact={false} />
            </div>
            <div className="mobile-extra">
             
              {user?.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  className="dropdown-link"
                  onClick={() => setIsOpen(false)}
                >
                  <MdAdminPanelSettings /> Admin Panel
                </Link>
              )}
               <div className="lang-desktop">
                <LanguageSwitcher compact={true} />
              </div>
            </div>
          </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
