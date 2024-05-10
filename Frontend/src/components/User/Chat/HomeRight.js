import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "../../css/HomeRight.css"
import UserDetailsContext from '../../context/UserDetails'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import {encryptdata,decryptdata} from  "./EncryptionandDecryption"
import img from "../image/profile.png"
import { imgpath } from '../../Api/Link'
import {FaArrowAltCircleRight, FaCircle, FaInfoCircle, FaTimesCircle} from "react-icons/fa"
import Viewuser from './Viewuser'
const HomeRight = () => {
   const {handlemsgsend,setsendmsg,sendmsg,userid,setuserid,users,sorted,msgload,onlineusers,loginuserdata,lastseenusers}=useContext(UserDetailsContext)
   const {user_id}=useParams()
   const [recdetails,setrecdetails]=useState(null)
  const [viewusermodal,setviewusermodal]=useState(false)
  useEffect(()=>{   
      setuserid(user_id)
      const recuser=users.find((ele)=>ele._id==user_id)
      setrecdetails(recuser)
  },[user_id])

  useEffect(()=>{
    if(sorted?.length!=0 && user_id){
      const elem=document.querySelector("#chat-body")
      if(elem)
      elem.scrollTop=elem.scrollHeight
    }
    })


  return (
    <div className='chat-panel'>
        <Viewuser users={users} userid={userid} setviewusermodal={setviewusermodal} viewusermodal={viewusermodal}/>
        {userid ?(
          <div className='chat'>
            
              <div className='chat-header'><div className='icon-body'><img src={recdetails!=null && recdetails.profilepic?recdetails.profilepic:img}/></div><span>{recdetails?.name || "Default User"}</span>
              <span className='badge text-primary' style={{cursor:"pointer"}} onClick={()=>setviewusermodal(true)}><FaInfoCircle/></span>
              <span className='chat-viewuser'>{onlineusers?onlineusers[recdetails?._id]? <span style={{color:'green',fontSize:"10px",margin:"10px"}}>Online</span> :  <span style={{color:'red',fontSize:"10px",margin:"10px"}}>Last seen {lastseenusers[recdetails?._id]?lastseenusers[recdetails?._id]:recdetails?.lastseen.length<50?recdetails?.lastseen:"a while ago"}</span> :"" }</span>

              </div> 
  
              <div className='chat-body' id="chat-body">
              {msgload ?<div className='msgloading'>Loading....</div>:( 
              sorted.map((item,index)=>(
                  item.type=="sent"?
                 <div className='right' key={index}><span className='con'><span className='msg'>{decryptdata(item.msg)} </span> <span className='time'>{`${new Date(item.date).getHours()>12?new Date(item.date).getHours()-12:new Date(item.date).getHours()}: ${new Date(item.date).getMinutes()<10?"0"+new Date(item.date).getMinutes():new Date(item.date).getMinutes()}  ${new Date(item.date).getHours()>12? "P.M" : "A.M"} `}</span></span></div> 
                : <div className='left' key={index}><span className='con'><span className='msg'>{decryptdata(item.msg)} </span> <span className='time'>{`${new Date(item.date).getHours()>12?new Date(item.date).getHours()-12: new Date(item.date).getHours()}: ${new Date(item.date).getMinutes()<10?"0"+new Date(item.date).getMinutes():new Date(item.date).getMinutes()} ${new Date(item.date).getHours()>12? "P.M" : "A.M"} `}</span></span></div> 
                 ) ))}
               </div>
              <div className='chat-footer'>
                <form onSubmit={handlemsgsend}>
                <input type="text" className='form-control' onChange={(e)=>setsendmsg(e.target.value)} value={sendmsg} required/>
                <button type="submit" className='btn btn-success'><FaArrowAltCircleRight/> </button>
                </form>
              </div>
          </div>
        ):(
           <div className='nouserselect'>Welcome  <br/>Start Conversation by selecting the users </div> 
        )}
    </div>
  )
}

export default HomeRight 