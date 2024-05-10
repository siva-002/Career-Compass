import React from 'react'
import { FaBookOpen, FaFoursquare, FaPenSquare, FaSketch, FaUserCheck} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const AptitudeNavbar = ({active,data,admins}) => {
  
  return (
    <div className='aptitude-navbar'>
            <ul className=''>
                <li>
                    <Link to="/user/aptitude/home"><button className={active=="home"?"active":""}> <FaFoursquare className='icon'/> <span>Dashboard</span></button></Link>
                </li>
                <li>
                   <Link to="/user/aptitude/test"> <button className={active=="test"?"active":""}> <FaPenSquare className='icon'/><span>Test</span></button></Link>
                </li>
                <li>
                   <Link to="/user/aptitude/study"> <button className={active=="study"?"active":""}> <FaBookOpen className='icon'/><span>Study</span></button></Link>
                </li>
                {admins?.includes(data?.email)?
                 <li>
                 <Link to="/user/aptitude/addquiz"> <button className={active=="addquiz"?"active":""}> <FaUserCheck className='icon'/><span>Add Quiz</span></button></Link>
                 </li>:""
                }
            </ul>
    </div>
  )
}

export default AptitudeNavbar