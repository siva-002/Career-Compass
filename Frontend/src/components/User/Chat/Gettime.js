import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Gettime = ({time,sorted}) => {
  const [hr,sethr]=useState()
  const [mn,setmn]=useState()
  const [format,setformat]=useState({})
  useEffect(()=>{

    if(time){
      sethr(new Date(time).getHours())
      setmn(new Date(time).getMinutes())
      const t=hr>12?hr-12:hr
      const fm=mn<10?"0"+mn:mn
      const fh=t<10?"0"+t:t
      setformat({hrs:fh,mins:fm})
    }
  })

  return (
    <div>{format.hrs} : {format.mins}</div>
  )
}

export default Gettime