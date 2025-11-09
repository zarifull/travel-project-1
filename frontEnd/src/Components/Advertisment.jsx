import React from 'react';
import '../styles/Advertisment.css';
import huppyWoman from '../Assets/huppyWoman.png'
import {Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Advertisment() {
  const {t}=useTranslation()
  return (
    <div className='main-contact'>
      <div className="mc-block">
        <div className="mc-theme">
          <p className="main-theme">
            {t("header.contact")}
          </p>
          <p className="main-item">
            {t("advertisment.mainItem")} ?
          </p>
            <Link to='/contacts' className='contacts-link' >{t("advertisment.contuctUs")}</Link>
        </div>
        <div className="mc-photo">
          <img src={huppyWoman} 
          className='mc-img'
          alt="" />
        </div>
      </div>
    </div>
  )
}

export default Advertisment
