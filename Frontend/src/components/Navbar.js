import React from 'react'
import "./css/Navbar.css"

import {FaCompass,FaHome,FaSignInAlt,FaInfo,FaInfoCircle} from "react-icons/fa"
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
const Navbar = ({active}) => {
  return (
    <div>
    <motion.nav className="navbar navbar-expand-lg bg-body-tertiary"
    initial={{opacity:0}}
    animate={{y:0,opacity:1}}
    transition={{type:"spring",stiffness:120}}
    
    >
      <div className="container">
        <div className="navbar-brand"><div className='title'>Career<div className='next-title'>Compass</div></div> </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarLink" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="offcanvas offcanvas-start" id="navbarLink">
       
        <ul className="navbar-nav offcanvas-body ms-lg-auto nav nav-tabs">
          <li className='offcanvas-header ms-auto'>
            <button type="button" className="btn-close text-bg-warning" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </li>     
            <li className="nav-item" role="presentation">
               <button className={active=="home"?"nav-link active":"nav-link"} data-bs-toggle="tab" ><Link to="/"><FaHome className='icon'/> Home </Link> </button>
            </li>
            <li className="nav-item" role="presentation">
                <button className={active=="signin"||active=="signup" ?"nav-link active":"nav-link"} data-bs-toggle="tab"  ><Link to="/signin"><FaSignInAlt className='icon'/> Signin</Link></button>
            </li>
         
            <li className="nav-item" role="presentation">
                <button className={active=="about"?"nav-link active":"nav-link"} data-bs-toggle="tab" ><Link to="/about"><FaInfoCircle className='icon'/> About</Link></button>
            </li>         
          
        </ul> 
        </div> 
      </div>
    </motion.nav>


        </div>
  )
}

export default Navbar