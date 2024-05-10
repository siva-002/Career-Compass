import React, { useContext } from 'react'
import "../../css/Forum.css"
import Forumsidebar from './Forumsidebar'
import { useParams } from 'react-router-dom'
import ForumHome from './ForumHome'
import UserDetailsContext from '../../context/UserDetails'
import ForumContext from '../../context/Forumcontext'
import Questions from './Questions'
import Authverify from '../Authverify'
import { useEffect } from 'react'
import Loader from '../Loader'
import SessionMessage from '../SessionMessage'
import UserNavbar from '../UserNavbar'
import Myreplies from './Myreplies'

const ForumDashboard = () => {
    const {page}=useParams()
    const {loginuserdata,users,setsessionexpiry,setloginload,loginload,sessionexpiry}=useContext(UserDetailsContext)
    const {posts,reloadallposts,allpostreload}=useContext(ForumContext)
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
    <UserNavbar active={"forum"}/>
    <div className='forum'>
        <div className='side-bar'>
        <Forumsidebar active={page}/>
        </div>
        
        <div className='main-content'>
        {!page?
        <ForumHome loginuser={loginuserdata} allposts={posts} users={users} reloadallposts={reloadallposts} allpostreload={allpostreload}/>
        :page=="questions"?
        <Questions loginuser={loginuserdata} />:
        page=="myreplies"?
        <Myreplies loginuser={loginuserdata} allposts={posts}/>
        :"soon"
        
        }
        </div>
       
    </div>
    </>)}
  
  </div>
)
}
  


export default ForumDashboard