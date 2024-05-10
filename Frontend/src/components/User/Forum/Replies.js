import React, { useEffect, useState } from 'react'
import { FaSadTear, FaTimesCircle } from 'react-icons/fa'
import { motion } from 'framer-motion'
import Apicon from '../../Api/Apicon'

const Replies = ({setrepliesmodal,repliesdata}) => {
    const [replies,setreplies]=useState()
    const [repliesload,setrepliesload]=useState(true)
    const getreplies=async()=>{
        setrepliesload(true)
        const options={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({postid:repliesdata.id})}
        const res=await Apicon("getreplies",options)
        setreplies(res.data)
        setrepliesload(false)
    }
    useEffect(()=>{
        getreplies()
    },[])
 
    
  return (
    <div className='getreplies'>
        <motion.div className='replies-con'
             initial={{y:'-100vh',opacity:0}}
             animate={{y:0,opacity:1}}
             transition={{type:"spring",stiffness:150}}
             exit={{y:"-100vh",opacity:0,transition:{duration:0.3}}}
        >
            <span className='badge text-warning close-btn' onClick={()=>setrepliesmodal(false)}><FaTimesCircle/></span>
            <div className='allcomments'>
                <div className='head'>
                <span className='badge text-primary'>{repliesdata?.title.toUpperCase()}</span>
                <span className='badge text-warning'>Replies {`( ${replies?.comments?.length || 0} )`}</span>
                </div>
            {repliesload?
            <div className='badge text-primary info '>
            <span className='spinner-border spinner-border-sm '></span>
            </div>
            :
            <div className='allcomments-con'>
            {replies?.comments?.length?
            replies?.comments?.sort((a,b)=>new Date(b.date)-new Date(a.date)).map((item,index)=>(
                <div key={index} className='comments-item'>
                    <span>{item.text}</span>
                    <div className='comment-details'>
                    <span>{item.user_name}</span>
                    <span>{new Date(item.date).toLocaleDateString()  } {new Date(item.date).toLocaleTimeString()}</span>
                    </div>
                </div>
            )):<span className='badge text-danger info'><FaSadTear/> No replies found</span>
        }</div>}
            </div>
        </motion.div>
    </div>
  )
}

export default Replies