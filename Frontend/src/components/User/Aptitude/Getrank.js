import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Getrank = ({data,scores}) => {
    const [rank,setrank]=useState()
    useEffect(()=>{
        if(scores && data){
            const find=scores.sort((a,b)=>b.scoreboard.points-a.scoreboard.points).map((ele,index)=>{
                if(ele._id == data._id){
                    setrank(index+1)
                }
            })
           
        }
    },[scores,data])

  return (
    <span className='badge'>{rank}</span>
  )
}

export default Getrank