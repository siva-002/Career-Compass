import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Getmessage, Gettime } from "./Gettime";
import { imgpath } from "../../Api/Link";
import Newmessagecount from "./Newmessagecount";
import { useContext } from "react";
import UserDetailsContext from "../../context/UserDetails";
import img from "../image/profile.png";
const UserMessages = ({search,filterprofession}) => {
  const {usersloading,users,loginuserdata,chats,id}=useContext(UserDetailsContext)


  return (
    <div className="usermessages">   
      {usersloading?(
        <span className="nousers">Loading chats...</span>
      ) : (
        (!usersloading && !users.length)?<span className="nousers">No Users found...</span>:
        users
          .filter(
            (user) =>
              !filterprofession?
              user._id != loginuserdata._id &&user.name.toUpperCase().includes(search.toUpperCase())  
             || 
              user._id != loginuserdata._id && user.area_of_interest?.toUpperCase().includes(search.toUpperCase()) 
            :
            user._id != loginuserdata._id && user.name.toUpperCase().includes(search.toUpperCase())&&user.profession?.toLowerCase().includes(filterprofession)
            ||
            user._id != loginuserdata._id && user.area_of_interest?.toUpperCase().includes(search.toUpperCase())&&user.profession?.toLowerCase().includes(filterprofession)
    
          )
          .map((user,index) => (
            
            <Link to={`/user/chat/${user._id}`} key={index}>
              <div className="user">
                <span className="user-icon">
                
                  <img src={user.profilepic?user.profilepic: img } alt="profile"/>
                </span>
                <div className="user-detail">
                  <span className="user-name">{user.name}</span>

                  {user.area_of_interest? (
                    <span className="user-msg">
                      {/* <span className={user.type}>{Getmessage(user)}</span> */}
                      {/* <span className="new-msg">{Newmessagecount(user._id,newmsgs)}</span> */}
                      <span className="users-list-profession badge  text-bg-success">{user.profession}</span>
                      <span className="last-msg-time badge  text-bg-primary">{user.area_of_interest}</span>
                    </span>
                  ) : (
                   ""
                  )}
                </div>
              </div>{" "}
            </Link>
          ))
      )}
    </div>
  );
};

export default UserMessages;
