import React, { useEffect, useState } from 'react'
import profile from "../image/profile.png"
const Comments = ({ele,users}) => {
    const [commentuser,setcommentuser]=useState()
    useEffect(()=>{
        const find=users?.find(user=>user._id==ele.user_id)
        setcommentuser(find)
    },[users])
  return (
    <div  className='comments-con'>
    <img src={commentuser?.profilepic || profile}/>
    <div className='comments-details'>   
    <span className='name'>{ele.user_name}</span>                              
    <span>{ele.text}</span>
    <span className='date'>{new Date(ele.date).toLocaleDateString()} {new Date(ele.date).toLocaleTimeString()}</span>
                                  
</div>
</div>
  )
}

export default Comments