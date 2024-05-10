import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Getlastmessagetime = ({chatdata,msgsent,userid,newchatdata}) => {
    const [time,settime]=useState()
    const [hour,sethour]=useState()
    const [min,setmin]=useState()
    
    useEffect(()=>{
      let find
      newchatdata?
      find=newchatdata?.find(ele=>ele._id==userid):
      find=chatdata?.find(ele=>ele._id==userid)
        settime(find.time)
        sethour(new Date(time).getHours())
        setmin(new Date(time).getMinutes())
      
    },[chatdata])

  return (
    <div>{hour?`${hour} : ${min} ${hour>=12?"P.M":"A.M"}`:"..."}</div>
    // <div>{time?.length>20?time?.substr(22):time?.substr(11,19)}</div>
  )
}

export default Getlastmessagetime