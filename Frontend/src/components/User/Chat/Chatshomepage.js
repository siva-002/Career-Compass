import React from 'react'
import { useContext ,useEffect} from 'react'
import UserDetailsContext from '../../context/UserDetails'
import { Link } from 'react-router-dom'
import { imgpath } from "../../Api/Link";
import img from "../image/profile.png";
import { Getmessage,Gettime } from './Gettime';
import Getlastmessage from './Getlastmessage';
import { useState } from 'react';
import Getlastmessagetime from './Getlastmessagetime';
import { FaRegSadTear, FaSadCry, FaSadTear } from 'react-icons/fa';
const Chatshomepage = ({ activechatpanel,newchatdata,search,chats,users,storing,sendmsg,chatdata,homechatsload,msgsent,newmsgcount}) => {
  
  // const {users,chats,storing}=useContext(UserDetailsContext)

  return (
    <div className='usermessages msgload'>
      {homechatsload?  <span className='msgloading'>Loading Chats...</span>:
      chatdata==undefined || !chatdata?.length?<span className='chats-info'><FaSadTear className='icon'/> No chats Found   </span>:
       chatdata?.sort((a,b)=>new Date(b.time)-new Date(a.time)).map((user,index)=>(     
   
         <Link to={`/user/chat/${user._id}`} key={index} >
         <div className={activechatpanel==user._id?"activechatpanel user chat-user-detail":"user chat-user-detail"}>
           <span className="user-icon">           
             <img src={user.profilepic?user.profilepic: img } />
           </span>
   
           <div className="user-detail">
                  <span className="user-name">{user.name}
                  {newmsgcount[user._id] &&
                  <span className="new-msg badge text-bg-warning">{newmsgcount[user._id]}</span>
                  } 
                  </span>
            </div>
            <span className="user-msg">
                     
                     {/* <span className="last-msg">{Getmessage(user.lastmsg,msgsent)}</span> */}
                     <span className="last-msg"><Getlastmessage chatdata={chatdata} newchatdata={newchatdata}
                     msgsent={msgsent} userid={user._id}
                     /></span>
                    
                     <span className="last-msg-time"><Getlastmessagetime chatdata={chatdata} newchatdata={newchatdata}
                     msgsent={msgsent} userid={user._id}/> </span>
                   </span>
           </div>
           </Link>
        
        
      ))}
    </div>
  )
}

export default Chatshomepage