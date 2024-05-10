import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'

const SessionMessage = () => {
  const nav=useNavigate()
  useEffect(()=>{
    const htmlContent = '<a href="/signin">Signin</a>'
    swal({
      title:"Session Expired",
      icon:"warning",
      text:"You will be redirected to signinpage or click below",
      content: {
        element: "div",
        attributes: {
          innerHTML: htmlContent,
        }
      },
      dangerMode:true
    }).then(()=>{
      nav("/signin")
    })
  })
  return (
    <></>
    // <span className='session-info'>Session Expired <Link to="/">Home</Link></span>
  )
}

export default SessionMessage