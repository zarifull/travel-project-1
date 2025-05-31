import React from 'react';
import './Advertisment.css';
import huppyWoman from '../../Assets/huppyWoman.png'

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
          <button className='main-btn' >
            Contuct Us
            </button>
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
