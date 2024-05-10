import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {FaEdit, FaTimes, FaTimesCircle, FaTrash} from 'react-icons/fa'
import Apicon from '../../Api/Apicon'
import swal from 'sweetalert'
import Updateloader from './Updateloader'
const Mycomment = ({setshowcommentsmodal,data,commentdata}) => {
    const [commentpost,setcommentpost]=useState()
    const [updatemodal,setupdatemodal]=useState(false)
    const [updatetext,setupdatetext]=useState()
    const [updatecid,setupdatecid]=useState()
    const [updateload,setupdateload]=useState(false)
    const [delload,setdelload]=useState(false)
    useEffect(()=>{
            const find=commentdata.find(ele=>ele.post_id==data.id)
            const cmnt=find?.comments?.filter(ele=>ele.user_id==data.userid)
            setcommentpost(cmnt)
    },[])
    const handledelete=async(cid)=>{
        const options={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
            commentid:cid,postid:data.id
        })}
        swal({
            title:"Are you sure want to delete your reply",
            buttons:true,
            dangerMode:true,
            icon:"info"
        }).then(async(action)=>{
            if(action){
                    setdelload(true)
                    const res=await Apicon("deletemyreply",options)
                    setdelload(false)
                    if(res.status==201){
                        swal({
                            title:"Reply Deleted",
                            icon:"success"
                        })
                    }else{
                        swal({
                            title:"Something Went Wrong",
                            icon:"info",
                            dangerMode:true
                        })
                    }
            }else{
                swal({
                    title:"Cancelled",
                    icon:"info"
                })
            }
        })
        console.log(options)
    }
    const handleupdate=async(cid,text)=>{
        setupdatetext(text)
        setupdatecid(cid)
        setupdatemodal(true)
    }
    const handleupdateform=async()=>{
        setupdateload(true)
            const options={
                method:"POST",headers:{"Content-Type":"application/json"},
                body:JSON.stringify({commentid:updatecid,pid:data.id,text:updatetext,date:new Date()})
            }
       
        const res=await Apicon("updatemyreply",options)
        setupdateload(false)
        if(res.status==201){
            swal({
                title:"Reply Updated",
                icon:"success"
            })
        }else{
            swal({
                title:"Something Went Wrong",
                icon:"info",
                dangerMode:true,
                text:"Please Try Again Later"
            })
        }
    }
  return (
    <>
    {delload&&<Updateloader/>}
    <AnimatePresence>
     {updatemodal&&
        <motion.div className='updatemodal'
        initial={{opacity:0}}
        animate={{x:"50%",y:"50%",transform:"translate(-50%,-50%)",opacity:1}}
        transition={{type:"spring",stiffness:150}}
        exit={{opacity:0,transition:{duration:0.3}}}
        
        >
            <span className='badge text-warning close-btn' onClick={()=>setupdatemodal(false)}><FaTimesCircle/></span>
            
            <div><span className='badge text-bg-primary'>
                Reply
            </span>
            </div>
            <textarea rows="8" cols="30" className='form-control' value={updatetext} onChange={(e)=>setupdatetext(e.target.value)}/>
            <button className='btn btn-success' onClick={handleupdateform} disabled={updateload?true:false}>
                {updateload?
                <span className='spinner-border spinner-border-sm'></span>
                :"Update Reply"}
            </button>
        </motion.div>}
     </AnimatePresence>
    <motion.div className='showcommentcon'
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{type:"spring",stiffness:150}}
    exit={{opacity:0,transition:{duration:0.3}}}
    >
       
    <span className='close-btn badge text-warning' onClick={()=>setshowcommentsmodal(false)}><FaTimesCircle/></span>
    <span className='badge text-primary'>{data?.title}</span>
    <div className='title-comment badge text-warning'>My Replies</div>
   
   <div className='mycomment-con'>
    {commentpost?.map((item,index)=>(
        <motion.div className='mycomment' key={index}
        whileHover={{boxShadow:"0px 0px 5px grey"}}
      
        >
        <span>{item.text}</span>
        <div>
        <span className='date'>{new Date(item.date).toLocaleDateString()}</span>
        <div className='actions'>
            <motion.span className='badge text-danger'
              whileTap={{scale:0.9}}
              onClick={()=>handledelete(item.cid)}
            ><FaTrash/></motion.span>
            <motion.span className='badge text-warning'
              whileTap={{scale:0.9}}
              onClick={()=>handleupdate(item.cid,item.text)}
            ><FaEdit/></motion.span>
        </div>
        </div>
        </motion.div>
    ))}
   </div>
    </motion.div>
    </>
  )
}

export default Mycomment