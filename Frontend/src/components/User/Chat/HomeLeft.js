import React, { useContext, useEffect, useState } from "react";
import "../../css/Homepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faGear,
  faMessage,
  faSignOut,
  faSignOutAlt,
  faUserFriends,
  faUsersGear,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import UserDetailsContext from "../../context/UserDetails";

import Profile from "../Home/Profile";
import Searchbar from "./Searchbar";
import UserMessages from "./UserMessages";
import Chatshomepage from "./Chatshomepage";
import moment from "moment";
import { encryptdata } from "./EncryptionandDecryption";
import { ToastContainer } from "react-toastify";


const HomeLeft = () => {
  const {newchatdata,newmsgcount,loginuserdata,users,usersloading,sorted,chats,storing,sendmsg,chatdata,setchatdata,msgsent ,homechatsload,userid} = useContext(UserDetailsContext);
  const [search, setsearch] = useState("");
  const [filterprofession,setfilterprofession]=useState("")
  useEffect(()=>{
    if(sendmsg!=null){
      const data= chatdata?.map(ele=>{
        if(ele._id==userid){
          return {...ele,lastmsg:encryptdata(sendmsg),time:moment(new Date().getTime()).format("DD/MM/YYYY hh:mm A")}
        }else{
          return ele
        }
       })
       setchatdata(data)
    }    
  },[msgsent])

  return (
    <div>
      
      <div className="chat-nav">
      <div className="user-info">
      
        
        <Link to="/user/chat">
          <span> {loginuserdata?.name}</span>
        </Link>
        <Link to="/user">
          <span> <FontAwesomeIcon  icon={faArrowAltCircleLeft} className="icon"/></span>
        </Link>
      </div>
      <div className="nav nav-tabs" id="tab" role="tablist">
        <button
          className="nav-link active"
          id=""
          data-bs-toggle="tab"
          data-bs-target="#home"
        >
       
          <FontAwesomeIcon icon={faMessage} /> Chats
        </button>
        <button
          className="nav-link "
          id=""
          data-bs-toggle="tab"
          data-bs-target="#users"
        >
         
          <FontAwesomeIcon icon={faUserFriends} /> Users
        </button>

      </div>
      </div>
      <div className="tab-content" id="">
        <div className="tab-pane fade show active" id="home">
          {/* <Searchbar setsearch={setsearch} id={"chathome"}/> */}
        <Chatshomepage search={search} id={"chathome"} 
       users={users} chats={chats} storing={storing} sendmsg={sendmsg} chatdata={chatdata}
       homechatsload={homechatsload}  msgsent={msgsent}
      activechatpanel={userid}
       newmsgcount={newmsgcount} newchatdata={newchatdata}
        />

        </div>
        <div className="tab-pane fade  " id="users">
          <Searchbar setsearch={setsearch} id={"chatusers"} filterprofession={filterprofession} setfilterprofession={setfilterprofession}/>
          <UserMessages search={search} id={"chatusers"}
          filterprofession={filterprofession} 
           />
        </div>
     
      </div>
      <ToastContainer/>
    </div>
  );
};

export default HomeLeft;
