import { createContext,useState ,useEffect} from "react";
import Homepage from "../User/Chat/Homepage";
import HomeRight from "../User/Chat/HomeRight";
import { useNavigate, useParams } from "react-router-dom";
import Apicon from "../Api/Apicon";

import Authverify from "../User/Authverify";
import Profile from "../User/Home/Profile";
import { encryptdata } from "../User/Chat/EncryptionandDecryption";
import moment from "moment/moment";
import socketIOClient from "socket.io-client"
import { socketLink } from "../Api/Link";
import { FaFilter } from "react-icons/fa";
import {toast} from "react-toastify"

const UserDetailsContext=createContext({})

export const UserDetailsProvider=({children})=>{

 const [sessionexpiry,setsessionexpiry]=useState(false)
 const [loginload,setloginload]=useState(true)
const [newchatdata,setnewchatdata]=useState()
  const [updateload,setupdateload]=useState(false)
  const [loginuserdata,setloginuserdata]=useState({})
  const [imgfile,setimgfile]=useState()
  const [uploadfile,setuploadfile]=useState()
  const [updatedata,setupdatedata]=useState({_id:"",name:"",email:"",department:"",dob:"",mobile:"",department:"",year:"",area_of_interest:""})
  const [error,seterror]=useState()
  const [users,setusers]=useState([])
  const [usersloading,setusersloading]=useState(true)
  const [Auth,setAuth]=useState(true)
  const [newmsgcount,setnewmsgcount]=useState({})

  //receiver
  const [userid,setuserid]=useState(null)
  const [sendmsg,setsendmsg]=useState("")
  const [msgload,setmsgmsgload]=useState(true)

  //sentmsg and recmsg
  const [allsentmsg,setallsentmsg]=useState()
  const [allrecmsg,setallrecmsg]=useState()
  const [messagesload,setmessagesload]=useState(true)
  const [lastmsgs,setlastsmsgs]=useState()
  //for particular user messages
 

  const [chats,setchats]=useState([])
  const [sorted,setsorted]=useState()
  const [newmsgs,setnewmsgs]=useState([])
const [chatdata,setchatdata]=useState([])
const [homechatsload,sethomechatsload]=useState(true)
const [msgsent,setmsgsent]=useState(false)
const [lastseenusers,setlastseenusers]=useState()
const [basefile,setbasefile]=useState()
//online users
const [onlineusers,setonlineusers]=useState()
const [sock,setsock]=useState()
const [admins,setadmins]=useState()
const [allevents,setallevents]=useState()

  const getuserdetails=async(id)=>{     
    const options=id?{
        method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify({"user_id":id})
    }:{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify()}
    const res=id?await Apicon('getuser',options):await Apicon('getusers',options)
    return res
  }
  const geteventslist=async()=>{
    const options={
      method:"GET",headers:{"Content-type":"application/json"}
    }
    const res=await Apicon("getevents",options)
    setallevents(res.data)
  }
  const getadminlist=async()=>{
    const options={
      method:"GET",headers:{"Content-type":"application/json"}
    }
    const res=await Apicon('getadmin',options)
    // console.log(res.data)
    const admin=[]
    res?.data?.map(ele=>{
      admin.push(ele.email)
    })
    setadmins(admin)

  }
  useEffect(()=>{
    const endpoint=`${socketLink() }`
    const socket=socketIOClient(endpoint)

    socket.on('connect', () => {
      console.log('WebSocket connected');
    })

    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error)
    })
    socket.on('disconnect', (reason) => {
                console.log('WebSocket disconnected:', reason);
                // if (reason === 'io server disconnect') {       
                    socket.connect();
                // }
    })
    setsock(socket)

    return ()=>socket.disconnect()
 },[])

 //joining socket
 useEffect(()=>{
  if(sock && loginuserdata?._id){     
    sock.emit('setup',loginuserdata._id)
  }
  if(loginuserdata?._id){
    setloginload(false)
  }
 },[loginuserdata])

 //getting online users
  useEffect(()=>{ 
    sock?.on('get onlineusers',(data)=>{
      if(data.error){
        console.log("error in getting online users",data.error)
      }else{
        // console.log(data)
        setonlineusers(data)
      }
    
    })
    sock?.on('get lastseenusers',(data)=>{
      setlastseenusers(data)
    })
    // console.log(onlineusers)
    return ()=>sock?.off()
  })


  //getting receiving msg
    useEffect(()=>{
    if(sock){
        sock.on("received message",(data)=>{
          // console.log("receiving")
          if(data.error){
            console.log("error in receiving message",data.error )
          }else{
           
             
             if(data.sender==userid){
              setsorted([...sorted,data])
              try{
              const audio=new Audio("/audio/incomingmsg.mp3")
              audio.play()
              }catch(err){
                
              }
              //updating lastmessage while receiving msg
             
           
          
             }else{
                const count=newmsgcount[data.sender]?newmsgcount[data.sender]:0
                setnewmsgcount({...newmsgcount,[data.sender]:count+1})
                const sentuser=users.find(ele=>ele._id==data.sender)
                toast.info(`${sentuser.name} sent a message`)
                try{
                const audio=new Audio("/audio/notification.mp3")
                audio.play()
                }catch(err){}
              
             }
             const newdata= chatdata?.map(ele=>{
              if(ele._id==data.sender){
                return {...ele,lastmsg:data.msg,time:data.time}
              }else{
                return ele
              }
              })
              // setchatdata(newdata)
              setnewchatdata(newdata)
              newmsgs.push(data)
          
             
          }
        // message.push(data)
      })
    }
    return ()=>sock?.off("received message")

    })
 
   
  useEffect(()=>{
    const fetchloginuserdata=async()=>{
    const id=sessionStorage.getItem('user_id')
    const res=await getuserdetails(id)
    setloginuserdata(res.data) 
    for(let x in res.data){
      updatedata[x]=res.data[x]
    }
    }

    const fetchalluserdata=async()=>{
      const res=await getuserdetails()
      setusers(res.data) 
      setusersloading(false)
    }
    fetchloginuserdata()
    fetchalluserdata()

    // setupdatedata(res.data)
  },[])

    //getting last message for all users
    const getlastmessage=async()=>{
      const msgs=[]
    
      users?.filter(ele=>ele._id!=loginuserdata._id && chats.has(ele._id)).map(async(ele)=>{
 
          const res=await storing(ele._id)        
          const sorted=await res.sort((a,b)=>new Date(a.time)-new Date(b.time))      
          const msg=await sorted[sorted.length-1]?.msg
          const time=await sorted[sorted.length-1]?.time         
          msgs.push({...ele,lastmsg:msg,time:time})    
         setlastsmsgs({...lastmsgs,msgs})

      })   
    }


    useEffect(()=>{
        const sorted=lastmsgs?.msgs?.sort((a,b)=>new Date(b.time)-new Date(a.time))
   
        setchatdata(sorted)     
    },[lastmsgs])

    //loading for home chats
    useEffect(()=>{
      if(chatdata?.length)
        sethomechatsload(false)
      setTimeout(() => {
          sethomechatsload(false)
        }, 50000);
    },[chatdata])

 
    //msgsendsection
    const handlemsgsend=async(e)=>{
      e.preventDefault()
      setmsgsent(!msgsent)
      const datatosend=sendmsg
      setsendmsg('')    
      const append={senderid:loginuserdata._id,receiverid:userid,msgid:"",msg:encryptdata(datatosend),date:new Date(),time:moment(new Date()).format("DD/MM/YYYY hh:mm A"),type:"sent"}
     
      newmsgs.push(append)
      const newdata= lastmsgs?.msgs?.map(ele=>{
        if(ele._id==append.receiverid){
          return {...ele,lastmsg:append.msg,time:append.date}
        }else{
          return ele
        }
        })
        setchatdata(newdata)
        setnewchatdata(newdata)

      if(sock){
        sock.emit('chat message',append)
      }else{
        console.log("socket not connected")
      }
   
      

      if(!chats[userid]){

        const newch=chats.add(userid)
        setchats(newch)

        getlastmessage()
      }

      sorted.push(append)

      const msgdata={senderid:loginuserdata._id,receiverid:userid,message:datatosend}
      const options={method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(msgdata)}
      const response=await Apicon("sendmessage",options)
     
     }

     //get-sent and received messages
     const getsentmessage=async()=>{
      const options={method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify({"id":loginuserdata?._id})}
      const response=await Apicon("getsentmessage",options)
      setallsentmsg(response.data)
      }
      const getreceivedmessages=async()=>{
        const options={method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify({"id":loginuserdata?._id})}
        const response=await Apicon("getreceivedmessage",options)
        setallrecmsg(response.data)
    }
      useEffect(()=>{
            getsentmessage()
            getreceivedmessages()
            getadminlist()
            geteventslist()
      },[loginuserdata])

      useEffect(()=>{
          getlastmessage()
        },[chats,allrecmsg,allsentmsg])
      //getting chatss
      useEffect(()=>{
        const msgs=[]
        allrecmsg?.map(ele=>msgs.push(ele.userid))
       allsentmsg?.map(ele=>{
        ele.messages.map(ele=>{
          msgs.push(ele.receiverid)
        })
       })
       const uni=new Set(msgs)
       setchats(uni)
      },[allrecmsg,allsentmsg])


      
//store mesage
      const storing=async(userid)=>{
          const allmsgs=[]
            await allsentmsg?.map(ele=>{
              ele.messages.filter(ele=>ele.receiverid==userid).map(
                ele=>ele.data.map(ele=>{
                      allmsgs.push({...ele,type:"sent",date:new Date(ele.time)})
                })
              )
            })

          await allrecmsg?.filter(ele=>ele.userid==userid).map(ele=>{
            ele.messages.map(ele=>{
              ele.data.map(ele=>{
                allmsgs.push({...ele,type:"received",date:new Date(ele.time)})
              })
            })
          })
          await newmsgs.map(ele=>{
            if(ele.receiverid == userid ){
            allmsgs.push(ele)
            }
            if(ele.sender&&ele.sender== userid){
              allmsgs.push(ele)
            }
          })
          return allmsgs
        }
      //getting sent and received messages

      useEffect(()=>{
        setmsgmsgload(true)
        const getmessages=async()=>{
        const allmsgs= await storing(userid)
        // console.log(allmsgs)
        const sortedcon= allmsgs.sort((a,b)=>a.date-b.date)

        setsorted(sortedcon)
        setmsgmsgload(false)
      }     
    getmessages()

      userid&&delete newmsgcount[userid]
      
  },[userid])
    // useEffect(()=>{
    //     console.log(allsentmsg)
    // },[allsentmsg])
    // useEffect(()=>{
    //     console.log(allrecmsg)
    // },[allrecmsg])
    // useEffect(()=>{
    //   console.log(newmsgs)
    // },[newmsgs])

    //update-section 
    const handleformupdate=async()=>{    
      setupdateload(true)  
      const formdata=new FormData()
      formdata.append('file',basefile)
     
      for(const key in updatedata){  
      formdata.append(key,updatedata[key])
      } 
    const options={method:"POST",body:formdata}
      const response=await Apicon("updateuser",options)
    setupdateload(false)
    return response
    }

    //convert to base64
    const converttobase64=(file)=>{
      return new Promise((resolve,reject)=>{
        const fileReader=new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload=()=>{
          resolve(fileReader.result)
        } 
        fileReader.onerror=(error)=>{
          reject(error)
        }
      })
    }
      //upload image
    const fileupload=async(e)=>{
        const file=e.target.files[0]
        const base=await converttobase64(file)
        setbasefile(base)
      if(file.type.startsWith("image/")){
        if((file?.size/1024)>500){
          seterror("Image Size must be less than 500kb")
        }else{
        seterror("")
        const reader=new FileReader()
        reader.onload=()=>{
          setimgfile(reader.result)
          
        }
        reader.readAsDataURL(file)
        setuploadfile(file)
        }
      }else{
        seterror("image files only supported")
      }
    }





  
    
    return(
        <UserDetailsContext.Provider value={{
          loginuserdata,updatedata,setupdatedata,imgfile,Auth,setAuth,fileupload,handleformupdate,error,updateload
       ,users,usersloading,sessionexpiry,setsessionexpiry,loginload,setloginload
       ,userid,setuserid,sendmsg,setsendmsg,msgsent,handlemsgsend,sorted,msgload,chats,storing,chatdata,setchatdata,homechatsload
      ,onlineusers,newmsgcount,newchatdata,lastseenusers,admins,allevents,setallevents
      }}>
          {children}
               
        </UserDetailsContext.Provider>
    )
}
export default UserDetailsContext