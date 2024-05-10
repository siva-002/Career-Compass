import React, { useContext, useEffect } from 'react'
import Homesidebar from './Homesidebar'
import UserNavbar from '../UserNavbar'
import { useParams } from 'react-router-dom'
import Profile from './Profile'
import Loader from '../Loader'
import SessionMessage from '../SessionMessage'
import Authverify from '../Authverify'
import UserDetailsContext from '../../context/UserDetails'
import "../../css/Dashboard.css"
import UserHome from './UserHome'
import ManageEvents from './ManageEvents'
const Dashboard = () => {
  const {loginuserdata,setsessionexpiry,setloginload,loginload,sessionexpiry,admins,allevents,setallevents,users} =useContext(UserDetailsContext)

    const {page}=useParams()
    
    useEffect(()=>{
        loginuserdata && Authverify(setsessionexpiry,setloginload)
       },[loginuserdata])
  return (
    <div >
    {loginload?<Loader/>:(
      sessionexpiry?
        <SessionMessage/>
      :
    <>
        <UserNavbar active="dashboard"/>
        <div className='dashboard-items'>
            <div className='dashboard-navbar'>
                <Homesidebar active={page} admins={admins} email={loginuserdata?.email}/>
            </div>
            <div className='dashboard-item'>
            {
                page=="profile"?<Profile/>:
                page=="manageevents"?<ManageEvents  users={users} admins={admins} allevents={allevents} setallevents={setallevents} loginemail={loginuserdata?.email}/>:
                <UserHome user={loginuserdata} admins={admins} allevents={allevents}/>
            }
            </div>
            
           
     
        </div>
    </>)}
  
    </div>
  )
}

export default Dashboard