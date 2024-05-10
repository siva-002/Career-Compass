import React, { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import Apicon from '../../Api/Apicon'
import { AnimatePresence, motion } from 'framer-motion'
import {FaTimes, FaTimesCircle} from 'react-icons/fa'
import Mycomment from './Mycomment'
import Updateloader from './Updateloader'

const Myreplies = ({loginuser,allposts}) => {
  const [repliedpost,setrepliedpost]=useState()
  const [commentdata,setcommentdata]=useState()
  const [repliedpostdata,setrepliedpostdata]=useState()
  const [showcommentsmodal,setshowcommentsmodal]=useState(false)
  const [modaldata,setmodaldata]=useState()
  const [loaddata,setloaddata]=useState(true)
  const getmyreplies=async()=>{
    const options={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userid:loginuser._id})}
    const res=await Apicon("getmyreplies",options)
    let posts=[]
    res?.data?.map(ele=>posts.push(ele.post_id))
    setcommentdata(res?.data)
    setrepliedpost(posts)
  }
  useEffect(()=>{
    let data=[]
    repliedpost&&
          allposts.map((ele)=>{
            if(repliedpost.includes(ele._id)){
              data.push(ele)
            }
        }
          )
    if(data.length){
      setrepliedpostdata(data)
      setloaddata(false)
    }
  },[repliedpost])
  setTimeout(()=>{  
    setloaddata(false)
  },10000)

  useEffect(()=>{
    getmyreplies()
  },[loginuser])

  const handlereplymodal=(id,title)=>{
    setshowcommentsmodal(true)
    setmodaldata({id:id,title:title,userid:loginuser._id})
  }
  return (
    <div className='myreplies'>
        <div className='title'>
            <div className='badge text-info'>My Replies</div>
        </div>
        <AnimatePresence>
        {showcommentsmodal&&
        <div className='showcomment'>
         <Mycomment setshowcommentsmodal={setshowcommentsmodal} data={modaldata} commentdata={commentdata}/>
        </div>
        }
        </AnimatePresence>
       
        <div className='repliescontainer'>
              {loaddata?<Updateloader/>:repliedpostdata?.length>0?
              repliedpostdata?.map((item,index)=>(
                <motion.div className='comment-item' key={index} onClick={()=>handlereplymodal(item._id,item.title)}
                whileTap={{scale:0.9}}
                whileHover={{scale:1.03,boxShadow:"0px 0px 5px lightgreen"}}
                >
                    <span className='badge text-bg-primary'>
                      {item.title}
                    </span>
                    <span className='badge text-bg-warning'>
                      {new Date(item.posted_date).toLocaleDateString()}
                    </span>
                    <span className='badge text-success'>
                      {item.posted_user_name}
                    </span>
                </motion.div>
               
              )):
              <span className='badge text-danger'>No replies to show</span>
              }
          </div>
    </div>
  )
}

export default Myreplies