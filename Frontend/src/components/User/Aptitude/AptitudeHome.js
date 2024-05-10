import React, { useContext, useEffect } from 'react'
import AptitudeNavbar from './AptitudeNavbar'
import "../../css/Aptitude.css"
import UserDetailsContext from '../../context/UserDetails';
import Authverify from '../Authverify';
import SessionMessage from '../SessionMessage';
import Homepage from './Homepage';
import { useParams } from 'react-router-dom';
import TestPage from "./Testpage"
import UserNavbar from '../UserNavbar';
import Addquiz from './Addquiz';
import Showquiz from './Showquiz';
import { AptitudeContext } from '../../context/Aptitude';
import Preparation from './Preparation';
const AptitudeHome = () => {
    const {sessionexpiry,setsessionexpiry,setloginload,loginuserdata,admins} =
    useContext(UserDetailsContext);

    const {load,quiz,submittedquizdata,finishedtest,scores}=useContext(AptitudeContext)
    useEffect(()=>{
     Authverify(setsessionexpiry,setloginload)
    },[])
    const {page}=useParams()
  
  return (
    
    <div className='aptitude'>
        {!sessionexpiry?<><UserNavbar active={"aptitude"}/><div className='aptitude-home'>
            <div className='aptitude-navbar-con'>
            <AptitudeNavbar active={page} data={loginuserdata} admins={admins}/>
            </div>
     
          <div className='aptitude-content'>
        {page=="home"?
          <Homepage submittedquizdata={submittedquizdata} scores={scores} data={loginuserdata}/>:
          page=="addquiz"?
          <Addquiz data={loginuserdata} admins={admins}/>
          :page=="test"?
          <Showquiz load={load} quiz={quiz} finishedtest={finishedtest}/>:
          <Preparation/>
        }
         </div>
         </div>
         </>
         :
         <SessionMessage/>
         }   
    </div>
  )
}

export default AptitudeHome