import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { decryptdata } from './EncryptionandDecryption'

const Getlastmessage = ({chatdata,msgsent,userid,newchatdata}) => {
    const [msg,setmsg]=useState()
    useEffect(()=>{
      let find
      newchatdata?
         find=newchatdata?.find(ele=>ele._id==userid):
         find=chatdata?.find(ele=>ele._id==userid)
        const get=async()=>{
          const ms=await decryptdata(find.lastmsg)
          setmsg(ms)
        }
        get()  
    },[chatdata,newchatdata])

 
  return (
    <div>{msg?.length>4?msg.substr(0,4)+"...":msg}</div>
  )
}

export default Getlastmessage