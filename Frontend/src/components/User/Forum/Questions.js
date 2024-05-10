import React, { useContext } from 'react'
import ForumContext from '../../context/Forumcontext'
import Updateloader from './Updateloader'
import { useState } from 'react'
import { useEffect } from 'react'
import Apicon from '../../Api/Apicon'
import { FaArrowCircleLeft, FaComment, FaEdit, FaRedo, FaReply, FaTrash } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import swal from 'sweetalert'
import { AnimatePresence, motion } from 'framer-motion'
import EditPost from './EditPost'
import Replies from './Replies'

const Questions = ({loginuser}) => {
   
    const [postdata,setpostdata]=useState(null)
    const [postdataload,setpostdataload]=useState(true)
    const [postdelload,setpostdelload]=useState(false)
   const [editpostmodal,seteditpostmodal]=useState(false)
   const [editpost,seteditpost]=useState()
   const [postreload,setpostreload]=useState(false)
   const [repliesmodal,setrepliesmodal]=useState(false)

   const [repliesdata,setrepliesdata]=useState()

    const handlepostreload=async()=>{
        setpostreload(true)
        sessionStorage.removeItem("userposts")
        await getposts()
        setpostreload(false)
        toast.info("Posts Refreshed")
    }
    const getposts=async()=>{
        if(!sessionStorage.getItem("userposts")){
        !postdata&&setpostdataload(true)
        const options={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userid:loginuser._id})}
        const res=await Apicon("getuserposts",options)
        setpostdata(res.data)
        sessionStorage.setItem("userposts",JSON.stringify(res.data))
        setpostdataload(false)
        }else{
            setpostdata(JSON.parse(sessionStorage.getItem("userposts")))
            setpostdataload(false)
        }
       
    }
    useEffect(()=>{
            loginuser?._id&&getposts()
    },[loginuser])

    const handlepostdelete=async(postid,title)=>{
        swal({
            title:`Are you sure want to delete ${title}`,
            dangerMode:true,
            buttons:true,
            icon:"warning"
        }).then(async(action)=>{
              if(action){
                setpostdelload(true)
                const options={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({postid:postid})}
                const res=await Apicon("deletepost",options)
                setpostdelload(false)
                if(res.status==201){
                    const data=postdata.filter((item)=>item._id!=postid)
                    setpostdata(data)
                swal({
                    title:"Post Deleted Successfully",
                    icon:"success"
                })
            }
                else
                swal({
                    title:"Something Went Wrong",
                    text:"Try Again Later",
                    dangerMode:true,
                    icon:"info"
                })
            }else{
                swal({
                    title:"Cancelled",
                    icon:"info"
                })
            }
        })
    }
    const handleEdit = (id,title,desc) => {
       seteditpostmodal(true)
       const data={postid:id,title:title,description:desc}
       seteditpost(data)
       
    }
    const getpostreplies=async(id,title)=>{
        setrepliesmodal(true)
        setrepliesdata({id:id,title:title})
    }
  return (
    <div className='forumquestions'>
        <ToastContainer/>
        {postdataload && <Updateloader/> }
        {postdelload && <Updateloader/> }
       
        <AnimatePresence>
        {repliesmodal && <Replies setrepliesmodal={setrepliesmodal} repliesdata={repliesdata}/>}
        {editpostmodal&&<EditPost seteditpostmodal={seteditpostmodal} editpostdata={editpost} seteditpostdata={seteditpost}/>}
        </AnimatePresence>
       <div className='headtitle badge text-info'>My Questions {`( ${postdata?.length || 0} )`}<span title="reload" className={`reloadbtn badge text-primary`} onClick={()=>handlepostreload()}>{!postreload?<FaRedo/>:<span className='spinner-border spinner-border-sm'></span>}</span></div>
       <div className='forum-questions-con'>
        {postdata?.length?
        postdata?.sort((a,b)=>new Date(b.posted_date)-new Date(a.posted_date)).map((ele,index)=>(
            <motion.div className='question-item' key={index}
            initial={{opacity:0}}
            animate={{opacity:1}}
            >
            <div className='title badge text-primary'>{ele.title}</div>
            <div className='actions'>
                <span title='edit' onClick={()=>handleEdit(ele._id,ele.title,ele.description)}><FaEdit/></span>
                <span title='delete' onClick={()=>handlepostdelete(ele._id,ele.title)}><FaTrash/></span>
            </div>
            <div className='getcomments'>
                <span title='replies' onClick={()=>getpostreplies(ele._id,ele.title)}> <FaReply/></span>
            </div>
            <div className='date badge text-warning'>{new Date(ele.posted_date).toLocaleDateString()} {new Date(ele.posted_date).toLocaleTimeString()}</div>
            </motion.div>
        )):
        <span className='badge text-danger'>No Data Found</span>
    }
    </div>
    </div>
  )
}

export default Questions