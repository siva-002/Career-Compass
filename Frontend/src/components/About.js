import React from 'react'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <motion.div className='aboutpage'
    exit={{x:"100vw",opacity:0,transition:{duration:0.3}}}
    >
      <motion.dl
        initial={{x:'-100vw',opacity:0}}
        animate={{x:0,opacity:1}}
        transition={{type:"spring",stiffness:150}}
      >
        <dt>Your Success Story Starts Here</dt>
        <dd>
        No matter where you are in your career journey, Career Compass is here to help you unlock your full potential and reach new heights of success. Join us today and take the first step towards a brighter future!
   
        </dd>
        <dt>Connect and Collaborate</dt>
        <dd>
        Connect with Alumnis, mentors, and like-minded professionals in our vibrant community to exchange ideas, seek advice, and forge valuable connections that can propel your career forward.
        </dd>
        <dt>Empowering Insights</dt>
        <dd>
        Gain valuable insights into industry trends, job market demands, and skill development opportunities to stay ahead of the curve and make informed decisions about your career path.  </dd>
      </motion.dl>
            </motion.div>
  )
}

export default About