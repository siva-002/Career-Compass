import React, { useContext, useEffect, useState } from "react";
import "../../css/Homepage.css";
import HomeLeft from "./HomeLeft";
import HomeRight from "./HomeRight";


import UserDetailsContext from "../../context/UserDetails";

import Authverify from "../Authverify";
import SessionMessage from "../SessionMessage";
import Loader from "../Loader";

const Homepage = () => {
  const {users,userloading,sessionexpiry,setsessionexpiry,setloginload} =
    useContext(UserDetailsContext);
    useEffect(()=>{
     Authverify(setsessionexpiry,setloginload)
    },[])
  return (
        
       <div className="Homepage"> 
          {!sessionexpiry?(
          !users.length?
          <Loader/>:
            <>
       
          <div className="Home-left">
            <HomeLeft />
          </div>
          <div className="Home-right">{!userloading ? <HomeRight /> : ""}</div> 
    
          </>

          ):(
            <SessionMessage/>
          )}
            
          </div>

  );
};

export default Homepage;
