import React, { useEffect, useState } from 'react'
import { FaTimesCircle,FaEnvelope,FaMobileAlt,FaUserTag, FaUserShield, FaCpanel, FaHeart, FaTools, FaDesktop, FaBuilding } from 'react-icons/fa'
import  defaultimg from "../image/profile.png"
const Viewuser = ({viewusermodal,setviewusermodal,viewuseremail,users}) => {
    const [user,setuser]=useState()
    useEffect(()=>{
        const find=users?.filter(ele=>ele.email==viewuseremail)
        find&&setuser(find[0])
     
    },[viewuseremail,users])
  return (
    viewusermodal&&
    <div className='viewusermodal'>
        <span className='badge text-primary'>Poster Details</span>
    <span className='badge text-bg-primary close-btn' onClick={()=>setviewusermodal(false)}><FaTimesCircle/></span>
    <div className='profile-container'>
    <div className='img'>
    <img src={user?.profilepic || defaultimg}/>
    </div> 
    <div className='user-info'>
    <span className='username'>{user?.name}</span>
    <span className='useremail'> <span><FaEnvelope/></span> <span>{user?.email}</span></span>
    <span className='usermobile'><span><FaMobileAlt/></span><span>{user?.mobile || "Unknown"}</span></span>
    <span className='userprofession ' title='profession'><span><FaUserTag/></span><span>{user?.profession|| "Unknown"}</span></span>
    <span className='userinterest' title="domain"><span><FaHeart /></span><span>{user?.domain|| "Unknown"}</span></span>
    <span className='userskills' title='skills'><span><FaDesktop /></span><span>{user?.skills|| "Unknown"}</span></span>
    <span className='usercompany' title='company'><span><FaBuilding /></span><span>{user?.company|| "Unknown"}</span></span>
    </div>
    </div>
    </div>
    
  )
}

export default Viewuser