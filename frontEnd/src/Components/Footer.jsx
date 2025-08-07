import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css'

function Footer() {
  return (
   <footer>
     <div className='footer-block'>
      <div className="container" style={{maxWidth:'90%'}}>
    <div className="footer-parts">
      <div className='footer-part footer-part1'>
       <span className='part1-prg'>Batken </span>  Travels
      </div>

      <div className='footer-part footer-part2'>
        <ul className='part2-ul'>
          <li className='part-li'>
            <Link className='part2-link' to='/about-us'>About Us</Link>
          </li>
          <li className='part-li'>
             <Link className='part2-link' to='/contacts'>Contact</Link>
          </li>
          <li className='part-li'><Link className='part2-link' to='/tour-list'>Tours</Link> </li>
          <li className='part-li'><Link className='part2-link' to='/' >Home </Link> </li>
          
        </ul>
      </div>

      <div className='footer-part footer-part3'>
      <i className="fa-brands part3-icon fa-instagram"></i>
      <i className="fa-brands part3-icon fa-square-youtube"></i>
      <i className="fa-brands part3-icon fa-whatsapp"></i>
      </div>
    </div>

    <hr />
    <div className="footer-last">
      <p> © 2025 Copyright  By Zarina Momunbai & Design by  RH Agency </p>
    </div>
    </div>
    </div>
   </footer>
  )
}

export default Footer
