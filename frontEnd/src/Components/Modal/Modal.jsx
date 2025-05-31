import React, { useState } from 'react';
import './Modal.css';
import { MdOutlineEmail  } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6"; 

function Modal({open,onClose}) {

    const [clickModal, setClickModal] = useState("Sign Up");

    if(!open) return null

  return (
    <div>
      <div onClick={onClose} className="modal">
          <p className='modal-theme'>{clickModal}</p>
            <p onClick={onClose} className='modal-btn'>X</p>
          <div className="modal-part">
            <div className="modal-boxes">

                    <div className="modal-box">
                    <label htmlFor="name"><FaRegUser /></label>
                    <input type="text" placeholder='name' className='modal-inp' />
                    </div>

                    <div className="modal-box">
                    <label htmlFor="email"><MdOutlineEmail /></label>
                    <input type="text" placeholder='email' className='modal-inp' />
                    </div>

                    <div className="modal-box">
                    <label htmlFor="Password"><RiLockPasswordLine /></label>
                    <input type="number" placeholder='password' className='modal-inp'/>
                    </div>

                    <div className="modal-btns">
                      <button className={clickModal === "Login" ? "modal-btn1" :"modal-btn1 grey"}
                      onClick={()=>{setClickModal("Sign Up")}}
                      >Sign Up</button>
                      <button className={clickModal === "Sign Up" ? "modal-btn1" :"modal-btn1 grey"}
                      onClick={()=> {setClickModal("Login")}}
                      >Login</button>
                    </div>

            </div>
            
            </div>
        </div>
      {/* </div> */}
    </div>
  )
}

export default Modal
