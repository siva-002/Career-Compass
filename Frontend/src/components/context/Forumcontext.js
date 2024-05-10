import { createContext, useEffect, useState } from "react";
import Apicon from "../Api/Apicon";
import { toast } from "react-toastify";


const ForumContext=createContext({})

export const ForumContextProvider=({children})=>{
    const [posts,setposts]=useState()
    const [allpostreload,setallpostreload]=useState(false)
    const getposts=async()=>{
       
        if(sessionStorage.getItem("allposts")==undefined){
        const options={method:"GET",headers:{"Content-Type":"application/json"}}
        const res=await Apicon("getposts",options)
        sessionStorage.setItem("allposts",JSON.stringify(res.data))
        setposts(res.data)
        }else{
            setposts(JSON.parse(sessionStorage.getItem("allposts")))
        }
    }
    const reloadallposts=async()=>{
        setallpostreload(true)
        sessionStorage.removeItem("allposts")
        await getposts()
        setallpostreload(false)
        toast.info("Posts Refreshed")
    }
    useEffect(()=>{
        getposts()
    },[])
    return(
        <ForumContext.Provider value={{
            posts, reloadallposts,allpostreload
        }}>
            {children}
        </ForumContext.Provider>
    )
}

export default ForumContext