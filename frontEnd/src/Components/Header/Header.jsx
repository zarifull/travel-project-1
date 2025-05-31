import React, { useRef, useState , useEffect} from 'react';
import logo from '../../Assets/logotip.png';
import { Link } from 'react-router-dom';
import './Header.css';
import { FiMenu, FiUser,} from "react-icons/fi";
import { TbCopyPlusFilled } from "react-icons/tb";
import Modal from '../Modal/Modal';


function Header() {
  const navRef = useRef();

  const [openModal,setOpenModal] = useState(false)

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
 
    <div className="header">
      <div className="container">
        <nav ref={navRef}>
          <div className="nav-block">
          <div className="nav-logo">
            <Link to='#'  className='logo-block' >
              <img className='logo' src={logo} alt="Logo" />
              <span className='logo-theme'>Batken Travels</span>
            </Link>
          </div>
        <div className="add-tours">
          <Link to='/Add-tour' className='addTour-icon'>
          <TbCopyPlusFilled />
          </Link>
        </div>
        <div className="nav-box">
          <div className="user-modal">
              <button className='nav-btn'
                onClick={()=> setOpenModal(true)} >
                <i className="fa-solid fa-user"></i>
              </button>
            <Modal open={openModal} onClose={()=> setOpenModal(false)}/>
          </div>

            <menu className="menu">
              <button className='nav-btn'>
                <FiMenu className="text-xl cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
                {isOpen && (
            <div className="menu-dropdown">
                  <Link to='/Contacts' className='menu-links'>Contacts</Link>
                  <Link to='/Tours' className='menu-links'>Tours</Link>
                  <Link to='/About-us' className='menu-links'>About Us</Link>
            </div>
                    )}
              </button>
            </menu>
        </div>
        </div>
        </nav>

      </div>
    </div>
   
  )
}

export default Header
