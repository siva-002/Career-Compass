import React from 'react'
import { useEffect } from 'react'
import Apicon from '../../Api/Apicon'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaFireAlt, FaInfoCircle,FaStar } from 'react-icons/fa'

const Showquiz = ({load,quiz,finishedtest}) => {
 
  return (
    <div className='showquiz'>
         {!load?
         <>
        <span className='title'>Quizz</span>
      
        <div className='quiz-con'>
            {quiz?.sort((a,b)=>new Date(b.Scheduled_on)-new Date(a.Scheduled_on)).map((ele,index)=>(
                <div key={index}>
           
                <div className='quiz-item'>
                {Math.ceil((new Date(ele.Scheduled_on) - new Date())/86400000)>-4?<span className='new-notify' title='Recently updated'><span><FaFireAlt style={{color:"red"}}/> </span> </span>:""}
                    <div className='quiz-title'>{ele.topic}</div>
                    <div className='total-quest' title='total questions'><span> <FaStar className='icon'/> {Object.keys(ele.questions[0]).length}</span></div>
                    {finishedtest?.includes(ele.quizid)?
                      <span className='badge text-bg-success quiz-open-btn' >Completed </span>
                    : <Link to={`/user/aptitude/test/${ele.quizid}`}>  <button className='btn btn-warning quiz-open-btn' >Start </button>
                    </Link> 
           
                    }
                    <div className='scheduled'>{ele.Scheduled_on.substr(0,10)}</div>
                </div>  
                
                </div>
            ))}          
        </div>
        </>
        :<div className='quiz-loader'> <div className="spinner-border text-primary" role="status">
        
        </div>Loading...</div>}
    </div>
  )
}

export default Showquiz