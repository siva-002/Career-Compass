import React, { useState } from 'react'

import Posts from './Posts'
import { useEffect } from 'react'
import Addquestion from './Addquestion'
import Updateloader from "./Updateloader"
import { AnimatePresence, motion } from 'framer-motion'
import { FaRedo, FaSpeakerDeck } from 'react-icons/fa'
import { useContext } from 'react'
import ForumContext from '../../context/Forumcontext'
import { ToastContainer } from 'react-toastify'
const ForumHome = ({loginuser,allposts,users,reloadallposts,allpostreload}) => {

    const [members,setmembers]=useState(0)
    const [postcount,setpostcount]=useState(0)
    const [usercount,setusercount]=useState(0)
    const [addquesmodal,setaddquesmodal]=useState(false)
    const [searchpost,setsearchpost]=useState("")
useEffect(()=>{
if(allposts){
    const users=[]
    allposts?.map((ele)=>{
        if(!users.includes(ele.posted_user_id)){
            users.push(ele.posted_user_id)
        }
    })
    setmembers(users)

}

},[allposts])


useEffect(() => {
    let userInterval
    if(allposts){
   
    userInterval = setInterval(() => {        
        setpostcount((count) => count + 1)
    }, 100)
    if(postcount==allposts?.length){
        clearInterval(userInterval)
    }
    if(postcount>allposts?.length){
        setpostcount(0)
    }
    }
    return ()=>clearInterval(userInterval)
},[postcount,allposts])
useEffect(()=>{
    let userInterval
    if(allposts){
    userInterval=setInterval(()=>{
        setusercount((count)=>count+1)
    },100)
    if(usercount==members.length){
        clearInterval(userInterval)
    }
    if(usercount>members?.length){
        setusercount(0)
    }
    }
    return()=>clearInterval(userInterval)
},[usercount,allposts])


  return (
    <div className='forum-home'>
        <ToastContainer/>
        <AnimatePresence>
        {addquesmodal&&
        <Addquestion modal={setaddquesmodal} loginuser={loginuser} />
        }
        </AnimatePresence>
        <div className='headtitle badge text-info'>Discussions 
        <div style={{display:"flex"}}>
            <input className='searchbtn form-control' placeholder='enter post title to search' onChange={(e)=>setsearchpost(e.target.value)}/>
            <span className='badge text-primary reloadbtn' title="reload" onClick={reloadallposts}>{!allpostreload?<FaRedo/>:<span className='spinner-border spinner-border-sm'></span>}</span></div></div>
        <div className='forum-home-content'>
        <div className='posts-container'>
            <AnimatePresence>
            {allposts?
            allposts?.filter(ele=>ele.title.toLowerCase().includes(searchpost.toLowerCase())).sort((a,b)=>new Date(b.posted_date) - new Date(a.posted_date)).map((ele,index)=>(
                 <Posts post={ele} key={index} user={users.filter(user=>user._id=ele.posted_user_id)}/>
            )):
            <Updateloader/>        
        }
         </AnimatePresence>

        </div>
        <div className='post-details rightpanel'>
            <div className='total-posts'>
                <span >Discussions</span> <span>{ postcount}</span>
            </div>
            <div className='total-users'>
                <span>Users</span><span> {usercount}</span>
            </div>
            <div>
                <br/>
                <motion.button className='btn btn-primary' onClick={()=>setaddquesmodal(true)}
                
                whileTap={{scale:0.9}}
                whileHover={{scale:1.1}}
                >Add Question</motion.button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default ForumHome