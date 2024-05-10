import React from 'react'
import {FaCompass,FaHome,FaFacebookMessenger,FaTeamspeak, FaThinkPeaks, FaSignOutAlt} from "react-icons/fa"
import { Link } from 'react-router-dom'

const UserNavbar = ({active}) => {
  return (
    <div>
    <nav className="navbar navbar-expand-lg bg-body-tertiary ">
      <div className="container">
        <div className="navbar-brand" ><div className='title' style={{fontSize:"25px",color:"green"}}> Career Compass </div> </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarLink" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="offcanvas offcanvas-start" id="navbarLink">
       
        <ul className="navbar-nav offcanvas-body ms-lg-auto nav nav-tabs">
          <li className='offcanvas-header ms-auto'>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </li>     
            <li className="nav-item" role="presentation">
               <button className={`nav-link ${active=="dashboard"?"active":""}`} data-bs-toggle="tab" ><Link to="/user/"><FaHome className='icon'/> Dashboard </Link> </button>
            </li>
            <li className="nav-item" role="presentation">
                <button className="nav-link" data-bs-toggle="tab"  ><Link to="/user/chat"><FaFacebookMessenger className='icon'/> Chat</Link></button>
            </li>
            <li className="nav-item" role="presentation">
                <button className={`nav-link ${active=="aptitude"?"active":""}`} data-bs-toggle="tab"  ><Link to="/user/aptitude/home"><FaThinkPeaks className='icon'/> Aptitude</Link></button>
            </li>
         
            <li className="nav-item" role="presentation">
                <button className={`nav-link ${active=="forum"?"active":""}`} data-bs-toggle="tab" ><Link to="/user/forum"><FaTeamspeak className='icon'/> Forum</Link></button>
            </li>         
                
          
        </ul> 
        </div> 
      </div>
    </nav>


        </div>
  )
}

export default UserNavbar