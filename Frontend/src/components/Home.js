import React, { useEffect } from 'react'
import "./css/Home.css"
import { AnimatePresence, motion } from 'framer-motion'

const Home = () => {
  // useEffect(()=>{
  //   const serverinfo=async()=>{
  //   const options={method:"GET",headers:{"content-type":"application/json"}}
  //   const res=await fetch(socketLink(),options)
  //   if(res.status){
  //     console.log("server connected")
  //   }else{
  //     console.log("server connection error")
  //   }
  //   }
  //   serverinfo()
  // },[])



  return (
   
    <motion.div className='Home'
      exit={{x:"-100vw",opacity:0,transition:{duration:0.3}}}
    >
   
      <motion.div className='Home-con'
          initial={{x:'-100vw',opacity:0}}
          animate={{x:0,opacity:1}}
          transition={{type:"spring",stiffness:150}}
         
      >
        <div className="img-container">
        <img src={require("./images/career-bg-1.png")}/>
        </div>
        <div className='info'>
                <div className='title'>
                Welcome to Career Compass </div><span className='sub'>- Your Guiding Light  to Success! 
                </span>
                <span className='description'>
                At Career Compass, we understand that navigating your career path can sometimes feel overwhelming. That's why we're here to provide you with the guidance and support you need to chart your course to success with confidence.

                </span>
        </div>
        </motion.div>
       
    </motion.div>

  )
}

export default Home