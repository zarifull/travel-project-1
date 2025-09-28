import React, { useRef, useState , useEffect} from 'react';
import logo from '../Assets/logotip.png';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import { FiMenu, FiUser,} from "react-icons/fi";
import { TbCopyPlusFilled } from "react-icons/tb";
import UserIcon from './UserIcon';
import { useAuth } from '../Context/AuthContext';
import { MdAdminPanelSettings, MdMenuOpen } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSw';

function Header() {
  const navRef = useRef();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };

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

  // console.log("User from context:", user);
  
  return (
 
    <div className="header">
      <div className="container">
        <nav ref={navRef} >
          <div className="nav-block">
          <div className="nav-logo">
            <Link to='/'  className='logo-block' aria-label="Main navigation" >
              <img className='logo' src={logo} alt="Logo" />
              <span className='logo-theme'>Batken Travels</span>
            </Link>
          </div>

        
        <div className="nav-box">
        <LanguageSwitcher/>

          <div className="admin">
            {user?.role === 'admin' && (
              <Link to='/admin/dashboard' className='admin-btn'><MdAdminPanelSettings /></Link>
            )}
          </div>
          
            <div className="nav-user">
              <UserIcon />
            </div>
              
            <menu className="menu">
              <div className='menu-icon' onClick={()=> setIsOpen(!isOpen)}>
                {isOpen ? 'X' : <FiMenu />} 
              </div>
             {isOpen && (
              <div className="menu-dropdown">
               <Link to='/' className='menu-links'>{t("header.home")}</Link>
              <Link to='/tour-list' className='menu-links'>{t("header.tours")}</Link>
              <Link to='/about-us' className='menu-links'>{t("header.aboutUs")}</Link>
              <Link to='/contacts' className='menu-links'>{t("header.contact")}</Link>

              </div>

               )}
          
            </menu>
            
            </div>
        </div>
        </nav>

      </div>
    </div>
   
  )
}

export default Header
