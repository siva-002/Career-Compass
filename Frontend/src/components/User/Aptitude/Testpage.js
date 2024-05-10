import React from 'react'
import "../../css/Aptitudetest.css"
import { useState } from 'react'
import Quiz from './Quiz'
import { useEffect } from 'react'
import Apicon from '../../Api/Apicon'
import { Link, useParams } from 'react-router-dom'
import { useContext } from 'react'
import { AptitudeContext } from '../../context/Aptitude'
const Testpage = () => {
  const [start,setstart]=useState(false)
  const {id}=useParams()
  const {quiz,finishedtest,finishedtestload,submittest,setsubmittest}=useContext(AptitudeContext)
  const [currentquiz,setcurrentquiz]=useState()
 
  useEffect(()=>{
    const item=quiz?.filter((ele)=>(ele.quizid==id))
    if(item){
      setcurrentquiz(item[0])
    }
  },[quiz])




  return (
    <>
     {!currentquiz ?<div className='quiz-loader'><div className='spinner-border text-primary'></div><span className='m-2'>Please Wait...</span></div>:
    !start?
    <div className='testpage'>
      <div className='test-container'>
      <div className='test-instructions'>
          <ul>
            <h3>Instructions</h3>
            <li>Test contains {currentquiz?Object.keys(currentquiz.questions[0]).length:0} questions</li>
            <li>Each question has four options</li>
            <li>Each correct answer you get 1 point</li>
            <li>No negative Points</li>
          </ul>
      </div>
      <div className='test-btn'>
          <Link to="/user/aptitude/test"><button className='btn btn-warning' >Back</button></Link>
      
            {finishedtest.includes(id)?
            <span className='badge text-success p-3' >Test Completed</span>
            :
          <button className='btn btn-success' onClick={()=>setstart(true)} >Start</button>
          }
         
         
      </div>

    </div>
    </div>:
    <Quiz quiz={currentquiz} submittest={submittest} setsubmittest={setsubmittest}/>
    }</>
  )
}

export default Testpage