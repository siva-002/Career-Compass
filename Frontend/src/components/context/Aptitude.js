import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import Apicon from "../Api/Apicon";
import { useContext } from "react";
import UserDetailsContext from "./UserDetails";


const AptitudeContext=createContext({})

export const AptitudeContextProvider=({children})=>{

    const {loginuserdata}=useContext(UserDetailsContext)
    const [quiz,setquiz]=useState()
    const [load,setload]=useState(true)
    const [submittedquizdata,setsubmittedquizdata]=useState()
    const [finishedtest,setfinishedtest]=useState([])
    const [finishedtestload,setfinishedtestload]=useState(true)
    const [scores,setscores]=useState()
    const [submittest,setsubmittest]=useState(false)
    useEffect(()=>{
        const getquizzes=async()=>{
          const options={method:"GET",headers:{"Content-Type":"application/json"}}
          const res=await Apicon("getquiz",options)
         
          await setquiz(res.data)
          setload(false)
        }
        getquizzes()

        const leaderboard=async()=>{
            const options={method:"GET",headers:{"Content-Type":"application/json"}}
            const res=await Apicon("getleaderboard",options)
            setscores(res.data)
        }
        leaderboard()

        const getsubmittedquizzes=async()=>{
            const options={method:"GET",headers:{"Content-Type":"application/json"}}
            const res=await Apicon(`submittedquiz?userid=${loginuserdata._id}`,options)
            await setsubmittedquizdata(res.data[0])
    
        }
        loginuserdata._id&&getsubmittedquizzes()
    },[loginuserdata,submittest])
 
 
    useEffect(()=>{
        const id=[]
        submittedquizdata?.quizzes.map((ele)=>{
          id.push(ele.quizid)
        })
        if(id){
            setfinishedtest(id)
            setfinishedtestload(false)
        }

    },[submittedquizdata])

  

  
    return (
        <AptitudeContext.Provider value={
                {load,quiz,submittedquizdata,finishedtest,finishedtestload,scores,submittest,setsubmittest}
        }>
            {children}
        </AptitudeContext.Provider>
    )
}

export {AptitudeContext}