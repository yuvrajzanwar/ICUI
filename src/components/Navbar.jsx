import React from 'react'
import "../styles/Navbar.css"
import logo from "../assets/logo2.png"
import {useNavigate} from 'react-router-dom'
const Navbar = () => {
    const navigate = useNavigate();
    const handleAbout = () => {
        window.open('https://www.yuvrajnz.in', '_blank');
    }
  return (
    <>
        <div className='navbar'>
            <div className='icon-text'>
                <img src="icon3d.png" alt="Logo" className='logo'/>
                <div className='main-title'>InstaCap</div>
            </div>
            <div onClick={handleAbout} className='about-button'>
                ABOUT
            </div> 
        </div>
      
    </>
  )
}

export default Navbar
