import {React, useContext, useEffect, useState} from 'react'
import { ToastContainer, Zoom, toast,Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./css/Home.css"
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import UserLoginContext from "./context/UserLoginContext"

const Login = () => {
    const {loginload,setloginload,user,handleloginchange,handleloginSubmit}=useContext(UserLoginContext)
  
    return (
      
    <motion.div className='signinpage'
    exit={{x:"-100vw",opacity:0,transition:{duration:0.3}}}
    >

        <motion.div className='signinform-container'
         initial={{x:'-100vw',opacity:0}}
         animate={{x:0,opacity:1}}
         transition={{type:"spring",stiffness:150}}
        
        >          
            <h4 ><span className='badge text-info'>Signin</span></h4>
        <form className='signinform' onSubmit={handleloginSubmit}>
            
            <div className='inp'>
                <label>Email</label>
                <input type='email' required className='form-control' onChange={handleloginchange} name="email"/>
            </div>
            <div className='inp'>
                <label>Password</label>
                <input type='password' required  className='form-control' onChange={handleloginchange} name="password" />
            </div>
            <div className='inp'>
                <span><Link to="/forgotpassword">Forgot Password? </Link> </span>
            </div>
            <div className='inp '>
                <button type='submit' value="Login" className='btn btn-success' disabled={loginload?true:false}>
                {(loginload)?( <span className="mt-1 spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
                
                
                 ):"Login"}<span> </span>
                </button>
                {/* <input type='reset' value="Reset" className='btn btn-danger'/> */}
            </div>
      
            <div className='inp'>
                <span>Don't have an account ? <Link to="/signup">Signup</Link> </span>
            </div>
           
        </form>
        <ToastContainer position="top-center" className="toast-notification" transition={Zoom}/>
    </motion.div>
    </motion.div>

  )
}

export default Login