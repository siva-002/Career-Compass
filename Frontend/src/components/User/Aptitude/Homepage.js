import React from 'react'
import { FaArchive, FaCheckCircle, FaCheckSquare, FaCross, FaDashcube, FaInfoCircle, FaMoneyBill, FaPenNib, FaQuestionCircle, FaStar, FaTimesCircle, FaTrophy } from 'react-icons/fa'
import IndividualLoader from './IndividualLoader'
import Getrank from './Getrank'
import { Link } from 'react-router-dom'
import { Modal, completedtest } from './Modal'
import { useState } from 'react'

const Homepage = ({submittedquizdata,scores,data}) => {
  const [modalopen,setmodalopen]=useState(false)
  const [modaltitle,setmodaltitle]=useState()
  const handlemodal=(e)=>{
    const parent = e.target.closest('.tab-title')
     const btn=parent.querySelector("button")   
    setmodaltitle(btn.id)  
    setmodalopen(true)    
  }
  return (
    <div className='aptitude-homepage'>
      {modalopen?
       <div className="show-modal">
            <div className="modal-con">
               <Modal setmodalopen={setmodalopen} modaltitle={modaltitle}/>
            </div>
       </div>:<>
      <span className='heading'> <FaDashcube className='icon'/> Dashboard </span>
      <div className='user-quiz-dashboard'>
        <div className='points'>
        <span className='tab-title'> <FaStar style={{color:"goldenrod"}}/> Points Earned</span>
           <span className='quiz-count points'>{submittedquizdata?submittedquizdata.scoreboard?.points || 0 : <IndividualLoader/> }</span>
        </div>
          <div className='total-quiz'>        
            <span className='tab-title'> <FaPenNib style={{color:"purple"}}/> Tests Completed <button id="tests completed" name="testcompleted" className='badge get-info text-bg-primary' onClick={handlemodal}  ><FaInfoCircle /></button></span>
              <span className='quiz-count'>{submittedquizdata?submittedquizdata.quizzes.length:<IndividualLoader/>}</span>
       
          </div>
          <div className='total-question'>
          <span className='tab-title'> <FaQuestionCircle style={{color:"blue"}}/> Questions Answered</span>
          <span className='quiz-count total'>{submittedquizdata?submittedquizdata.scoreboard.totalquestions:<IndividualLoader/>}</span>
          </div>
          <div className='correct-answers'>
          <span className='tab-title'> <FaCheckCircle style={{color:"green"}}/> Correct Answers</span>
          <span className='quiz-count correct'>{submittedquizdata?submittedquizdata.scoreboard.correctans:<IndividualLoader/>}</span>
          </div>
          <div className='wrong-answers'>
          <span className='tab-title'> <FaTimesCircle style={{color:"red"}}/> Wrong Answers <button id="wrong answers" className='badge get-info text-bg-primary' onClick={handlemodal}  ><FaInfoCircle /></button></span>
          <span className='quiz-count wrong'>{submittedquizdata?submittedquizdata.scoreboard.wrongans:<IndividualLoader/>}</span>
          </div>
          <div className='leaderboard'>
          <span className='tab-title rank'><FaTrophy style={{color:"orange"}}/> Leaderboard <Getrank scores={scores} data={data}/> </span>
          <span className='head'><span>Rank</span><span>Name</span><span>Points</span></span>
            {scores?.sort((a,b)=>b.scoreboard.points-a.scoreboard.points).map((ele,index)=>(
              <span key={index} className='leaderboard-user'>
              <span>{index+1}</span>
              <span style={{width:"65%",wordWrap:"break-word",textAlign:"center"}}>{ele.name}</span>
              <span>{ele.scoreboard.points}</span>
              </span>

            ))}
          </div>
      </div></>}
    </div>
  )
}

export default Homepage