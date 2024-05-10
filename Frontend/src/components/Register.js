import React, { useContext, useEffect, useState } from 'react'
import "./css/Home.css"
import { Link } from 'react-router-dom'
import UserRegisterContext from './context/UserRegisterContext'
import { ToastContainer ,Zoom} from 'react-toastify'
import { motion } from 'framer-motion'
const Register = () => {
    const {newuser,setnewuser,regload,setregload,handlechange,handleSubmit}=useContext(UserRegisterContext)
  return (
    <motion.div className='signuppage'
    exit={{x:"-100vw",opacity:0,transition:{duration:0.3}}}
    >
        <motion.div className='signupform-container'
         initial={{x:'-100vw',opacity:0}}
         animate={{x:0,opacity:1}}
         transition={{type:"spring",stiffness:150}}
        >
        <h4 ><span className='badge text-info'>Signup</span></h4>
        <form className='signupform' onSubmit={handleSubmit}>
            
            <div className='inp'>
                <label>Name</label>
                <input type='text' required className='form-control' onChange={handlechange} name="username"  />
            </div>
            <div className='inp'>
                <label>Email</label>
                <input type='email' required className='form-control' onChange={handlechange} name="email" />
            </div>
            <div className='inp'>
                <label>Password</label>
                <input type='password' required  className='form-control' onChange={handlechange} name="password" />
            </div>
            <div className='inp'>
                 <button type='submit' value="Login" className='btn btn-primary' disabled={regload?true:false}>
                {(regload)?(<span className="spinner-border spinner-border-sm mt-1" role="status" aria-hidden="true"></span>
                ):"Register"}  <span> </span>
                </button>
                {/* <input type='reset' value="Reset" className='btn btn-danger'/> */}
            </div>
      
            <div className='inp'>
                <span>Already have an account ? <Link to="/signin">Signin</Link> </span>
            </div>
        </form>
        <ToastContainer  position="top-center" className="toast-notification" transition={Zoom} />
        </motion.div>
    </motion.div>
  )
}

export default Register