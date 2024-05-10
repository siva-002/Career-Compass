import React from 'react'
import { FaComment, FaCommentSlash, FaDiscord, FaQuestionCircle, FaUserCircle, FaUserEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Forumsidebar = ({active}) => {
  return (

    <div className='aptitude-navbar sidebar'>
            <ul className=''>
                <li>
                    <Link to="/user/forum/"><button className={!active?"active":""}> <FaDiscord className='icon'/> <span>Discussions</span></button></Link>
                 </li>
                 <li>
                 <Link to="/user/forum/questions"><button className={active=="questions"?"active":""}> <FaQuestionCircle className='icon'/> <span>Questions</span></button></Link>
        
                 </li>
                 <li>
                 <Link to="/user/forum/myreplies"><button className={active=="myreplies"?"active":""}> <FaComment className='icon'/> <span>Replies</span></button></Link>
        
                 </li>
              
               
                {/* <li>
                 <Link><button onClick={handlelogout}><FaSignOutAlt className='icon'/> <span>Logout</span></button></Link> 
                </li> */}
             
               
            </ul>
    </div>
  )
}

export default Forumsidebar