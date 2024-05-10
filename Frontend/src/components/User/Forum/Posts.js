import React, { useEffect, useState } from 'react'
import { FaComment, FaPlus, FaPodcast, FaRegPlusSquare, FaReply, FaTelegramPlane, FaUserPlus } from 'react-icons/fa'
import profile from "../image/profile.png"
import swal from 'sweetalert'
import { useContext } from 'react'
import UserDetailsContext from '../../context/UserDetails'
import Apicon from '../../Api/Apicon'
import Updateloader from './Updateloader'
import Comments from './Comments'
import { motion } from 'framer-motion'
const Posts = ({post,user}) => {
    const [commentsshow,setcommentsshow]=useState(false)
    const [commentdata,setcommentdata]=useState()
    const [postuser,setpostuser]=useState()
    const [postcommentload,setpostcommentload]=useState(false)
    const [getcommentsload,setgetcommentsload]=useState(false)
    const {users,loginuserdata}=useContext(UserDetailsContext)
    useEffect(()=>{
        if(users){
            const find=users.find(ele=>ele._id==post.posted_user_id)
            setpostuser(find)
        }
    },[users,post])
   
    const handlecomment=async(id)=>{
        !commentdata&&setgetcommentsload(true)
        setcommentsshow(!commentsshow)
        const options={method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify({postid:id})}
        const res=await Apicon("/getcomments",options)
        setcommentdata(res?.data?.comments)
        setgetcommentsload(false)
       
        

    }
   
    const handlereply=(title,currentpostid)=>{

        swal(`Reply to ${title?.toUpperCase()}`,{
            content:"input",    
            button:{
                text:"Post Reply"
            }                
        }).then(async(val)=>{
            
            const data={postid:currentpostid,userid:loginuserdata._id,reply:val,date:new Date()}

            const options={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}

            if(val?.length){
                setpostcommentload(true)
                const res=await Apicon("replypost",options)
                setpostcommentload(false)
                res.status==200?
                    swal({
                        text:"Replied Successfully",
                        icon:"success"
                    })
                    :
                    swal({
                        text:"Something went wrong",
                        icon:"warning",
                        dangerMode:true
                    })
            }else{
                swal({
                    text:"Reply cannot be empty",
                    icon:"warning"
                })  
            }
        })
    }

  return (
    <div>
        {postcommentload && <Updateloader/>}
       <motion.div
       initial={{scale:0.9,x:"-100vw",opacity:0}}
       animate={{x:0,opacity:1}}
    whileHover={{scale:1,cursor:"pointer"}}
    transition={{type:"spring",stiffness:500}}
       exit={{x:"100vh",opacity:0,overflow:"hidden"}}
       className={`post ${commentsshow?'comment_show':""}`} >

                <div className='user-img'><img src={postuser?.profilepic||profile}/></div>
                <div className='post-details'>
                <span className='post-head'>
                    <span className='title'>{post.title}</span>
                    <span className='date'>{post.posted_user_name} on {new Date(post.posted_date).toLocaleDateString()} {new Date(post.posted_date).toLocaleTimeString()}</span>
                   
                    
                </span>
                <span className='post-description'>{post.description}</span>
                <span className='comment-btn'><FaComment onClick={()=>handlecomment(post._id)}/></span>
                <span className='commentpost-btn'><FaReply onClick={()=>handlereply(post.title,post._id)}/></span>
          
                {/* <div className='reply-group'>
                <input className='form-control replyinput' type="text" required/>
                <button className='btn text-primary'><FaTelegramPlane/></button>
                </div> */}
                <div className={`comments-panel ${commentsshow?'activecommentpanel':""}`}>
                {getcommentsload?<span className='badge text-warning'>Getting comments...</span>:<>
                <span className='badge text-primary'>Replies  {`( ${commentdata?.length || 0} )`} </span>
                        {commentdata?.sort((a,b)=>new Date(b.date)-new Date(a.date)).map((ele,index)=>(
                            <Comments ele={ele} users={users} key={index}/>
                        ))}
                    </>}
                </div>
              </div> 
            </motion.div>
     </div>
            
  )
}

export default Posts