import React from 'react';
import '../styles/Advertisment.css';
import huppyWoman from '../Assets/huppyWoman.png'
import {Link} from 'react-router-dom';

function Advertisment() {
  return (
    <div className='main-contact'>
      <div className="mc-block">
        <div className="mc-theme">
          <p className="main-theme">
            Contuct Us
          </p>
          <p className="main-item">
            Do you have any Question
          </p>
            <Link to='/contacts' className='contacts-link' >Contuct Us</Link>
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
