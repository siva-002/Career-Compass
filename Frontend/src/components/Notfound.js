import React from 'react'
import { useNavigate } from 'react-router-dom'

const Notfound = () => {
    const nav=useNavigate()
  return (
    <div className='not-found'>
        <img src={require("./images/notfound.png")}/>
        <button className='badge text-bg-primary' onClick={()=>nav("/")}>Go Home</button>
    </div>
  )
}

export default Notfound