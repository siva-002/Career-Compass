import React from 'react'
import { FaBookOpen, FaFoursquare, FaNewspaper, FaPenSquare, FaSignOutAlt, FaSketch, FaUserCheck, FaUserCircle, FaUserEdit} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

const Homesidebar = ({active,data,admins,email}) => {
  const nav=useNavigate()
  const handlelogout=()=>{

    sessionStorage.removeItem('user_token')
    sessionStorage.removeItem('user_id')
    nav("../")

  }
  return (
    <div className='aptitude-navbar sidebar'>
            <ul className=''>
                <li>
                    <Link to="/user/"><button className={!active?"active":""}> <FaUserCircle className='icon'/> <span>Home</span></button></Link>
                </li>
                <li>
                    <Link to="/user/profile"><button className={active=="profile"?"active":""}> <FaUserEdit className='icon'/> <span>Update Profile</span></button></Link>
                </li>
                {
                  admins?.includes(email)&&
                  <li>
                  <Link to="/user/manageevents"><button className={active=="manageevents"?"active":""}> <FaNewspaper className='icon'/> <span>Manage Events</span></button></Link>
                  </li>
                }
                {/* <li>
                 <Link><button onClick={handlelogout}><FaSignOutAlt className='icon'/> <span>Logout</span></button></Link> 
                </li> */}
             
               
            </ul>
    </div>
  )
}

export default Homesidebar