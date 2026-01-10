import React from 'react';
import '../styles/Contacts.css';
import { SiGooglestreetview } from "react-icons/si";
import { FaPhone } from "react-icons/fa";
import { TbClockHour10 } from "react-icons/tb";
import contacts from '../Assets/contacts.png';
import { useTranslation } from 'react-i18next';

function Contacts() {
  const { t } = useTranslation();
  return (
    <div className='contacts'>
      <div className="container">
        <p className='contacts-theme'>{t("contact.contacts")}</p>
        <div className="contacts-block">
        <div className="contacts-part1">
          <div className="contacts-location">
            <p className="contacts-prg"><SiGooglestreetview /> {t("contact.location")} </p>
            <p className="address-theme">{t("contact.city")}</p>
            <p className="address-theme">{t("contact.street")} </p>
            {/* <p className="address-theme">{t("contact.floor")}</p> */}
          </div>
          <div className="contacts-phone">
            <p className="phone-icon"><FaPhone /> {t("contact.phone")}</p>
            <p className="phone-number"><a href="+996221515163">0221 515 163</a></p>
            <p className="phone-number"><a href="+996777505294">0777 505 294</a></p>
          </div>
          <div className="contacts-hours">
            <p className="hours-icon"><TbClockHour10 /> {t("contact.hours")}</p>
            <p className="hours-theme">{t("contact.workingHours")}</p>
          </div>
        </div>
        <div className="contacts-part2">
          <img className="contacts-img" src={contacts} alt="" />
        </div>
      </div>
      </div>
    </div>
  )
}

export default Contacts;
