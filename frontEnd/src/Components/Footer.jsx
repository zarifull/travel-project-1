import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import {useTranslation } from 'react-i18next';

function Footer() {
  const {t} = useTranslation()
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
            <Link className='part2-link' to='/about-us'>{t("footer.aboutUs")}</Link>
          </li>
          <li className='part-li'>
             <Link className='part2-link' to='/contacts'>{t("footer.contact")}</Link>
          </li>
          <li className='part-li'><Link className='part2-link' to='/tour-list'>{t("footer.tours")}</Link> </li>
          <li className='part-li'><Link className='part2-link' to='/' >{t("footer.home")} </Link> </li>
          
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
      <p>{t("footer.copyright")}</p>
    </div>
    </div>
    </div>
   </footer>
  )
}

export default Footer
