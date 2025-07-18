import React from 'react';
import '../styles/Contacts.css';
import { SiGooglestreetview } from "react-icons/si";
import { FaPhone } from "react-icons/fa";
import { TbClockHour10 } from "react-icons/tb";
import contacts from '../Assets/contacts.png';

function Contacts() {
  return (
    <div className='contacts'>
      <div className="container">
        <p className='contacts-theme'>Contacts</p>
        <div className="contacts-block">
        <div className="contacts-part1">
          <div className="contacts-location">
            <p className="contacts-prg"><SiGooglestreetview /> Location </p>
            <p className="address-theme">Batken city</p>
            <p className="address-theme">Saydyman Ajy 2/8 </p>
            <p className="address-theme">2-floor</p>
          </div>
          <div className="contacts-phone">
            <p className="phone-icon"><FaPhone /> Phone</p>
            <p className="phone-number"><a href="+996700485718">0700485718</a></p>
            <p className="phone-number"><a href="+996551989817">0551989817</a></p>
          </div>
          <div className="contacts-hours">
            <p className="hours-icon"><TbClockHour10 /> Hour</p>
            <p className="hours-theme">8:00 - 20:00</p>
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
