import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaBook, FaCheckCircle, FaInfoCircle, FaStopwatch, FaStumbleuponCircle, FaTimes, FaTimesCircle } from "react-icons/fa"
import UserDetailsContext from '../../context/UserDetails'
import Apicon from '../../Api/Apicon'
import { ToastContainer, toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { AptitudeContext } from '../../context/Aptitude'
import swal from 'sweetalert'
const Quiz = ({quiz,submittest,setsubmittest}) => {
  const {loginuserdata}=useContext(UserDetailsContext)

  const [secs,setsecs]=useState(0)
  const [min,setmin]=useState(0)
  const [hr,sethr]=useState(0)
  const [showansmodal,setshowansmodal]=useState(true)
  const [questions,setquestions]=useState([])
  const [options,setoptions]=useState([])
  const [answers,setanswers]=useState([])
  const [questionno,setquestionno]=useState(0)
  const [submit,setsubmit]=useState()
  const [correctans,setcorrectans]=useState(0)
  const [wrongans,setwrongans]=useState([])
  const [submitload,setsubmitload]=useState(false)
  const [submitted,setsubmitted]=useState(false)
  const [solution,setsolution]=useState()
  let time
 
  useEffect(()=>{
    const timer=()=>{
      setsecs((secs)=>secs+1) 
    }
    if(!submitted){
    time=setInterval(timer,1000)
    return ()=>clearInterval(time)
    }else
     clearInterval(time)
    
  },[submitted])
    useEffect(()=>{
      setshowansmodal(false)
      quiz?.questions.map(ele=>setquestions(ele))
      quiz?.options.map(ele=>setoptions(ele))
      quiz?.answers.map(ele=>setanswers(ele))
      quiz?.solution.map(ele=>setsolution(ele))

     
    },[quiz])
   

    useEffect(()=>{
      if(secs>=60){
        setmin((min)=>min+1)
        setsecs(0)
      }
    },[secs])
    useEffect(()=>{
      if(min>=60){
        sethr((hr)=>hr+1)
        setmin(0)
      }
    },[min])
    const next=()=>{
      setquestionno(questionno+1) 
    }
    const previous=()=>{    
      setquestionno(questionno-1) 
    }
    const setans=(e)=>{
      const data={...submit,[e.target.name]:e.target.value}
      setsubmit(data)

    }
   
    const submitquiz=async()=>{
      setsubmitload(true)
      clearInterval(time)
      setsubmitted(true)
      let correct=0
      let wrong=[]
      for(let x in answers){
          if(submit[x].trim()==answers[x].trim()){
            correct+=1
          }else{
            wrong.push(x)
          }

      }
      setcorrectans(correct)
      setwrongans(wrong)
      const ftime=`${hr}:${min}:${secs}`
  
      const postdata={
        userid:loginuserdata._id,
        topic:quiz.topic,
        quizid:quiz.quizid,
        totalquestions:Object.keys(questions).length,
        correctans:correct,
        wrongans:wrong,
        time:ftime,
        submitteddate:new Date()
      }
      const postoptions={method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(postdata)}
      const res=await Apicon("submitquiz",postoptions)

      if(res.status==201){
        swal({
          title: "Test Submitted Successfully",
          icon: "success",
      })
      }else if(res.status==200){
        swal({
          title: "Test Already Submitted",
          icon: "info",
      })
      }else{
        swal({
          title: "Try Again Later",
          icon: "error",
      });
      }
      setsubmitload(false)
      setsubmittest(!submittest)
    }
 
  return (
   <div>
    <ToastContainer/>
    {!submitload?
    <div className='quiz-test'>

      <div className='quiz-test-con'>
    <div className='quiz-head'>
      <div className='quiz-title'> <FaBook className='icon'/> Topic : {quiz.topic} 
      <div className='quiz-close'>{submitted&&<Link to="/user/aptitude/test"><button className='btn btn-warning'><FaTimes/> Close test</button></Link>}</div>        </div>
       
       <div className='quiz-timer'><FaStopwatch className='icon'/> <span>{hr<10?"0"+hr:hr}</span> : <span>{min<10?"0"+min:min}</span> : <span>{secs<10?"0"+secs:secs}</span></div>
    </div>
    <div>
      <br/>
      <span> <FaInfoCircle className='icon'/> {questionno+1} </span>
    </div>
      <div className='panel'>
        <div className='panel-con'>
          {showansmodal&&
          <div className='answer-modal'>
            <span className='close-info badge text-bg-warning' onClick={()=>setshowansmodal(false)}><FaTimesCircle/></span>
            <span className='badge text-bg-primary'>Question {questionno+1}</span>
            <br/>
            <span>
              <ul>
              {solution&&solution[questionno].split(";").map(ele=>(
                <li>{ele} </li>
              ))}

              </ul>
            </span>
          </div>
          }
              <div className='question-panel'>
                {questions[questionno]}  
              </div>
              <div>
                {submitted?wrongans.includes(questionno.toString())?<span> <FaTimesCircle style={{color:"red"}}/> Correct Answer : {answers[questionno]} <span className='badge text-bg-primary open-info' onClick={()=>setshowansmodal(true)}><FaInfoCircle/></span></span>:<span><FaCheckCircle style={{color:"green"}}/> Correct</span>:""}
              </div>
              <ul className='option-panel'>
                {options[questionno]?.split(",").map((ele,index)=>
                  <li key={index}>
                    <button  name={questionno} className={submit?submit[questionno]==ele?"active":"btn btn-light" :"btn btn-light"} onClick={(e)=>setans(e)} value={ele} >{ele}</button>
                    </li>
                  )}
                  
              </ul>
              <div className='button-panel'>
                <div className='ctrl-btn'>
                  <button className='btn ' onClick={previous} disabled={questionno==0?true:false}> <FaArrowAltCircleLeft/> </button>
                  <button className='btn ' onClick={next} disabled={Object.keys(questions).length == questionno+1?true:false }><FaArrowAltCircleRight/> </button>
                  <button type="submit" className='btn btn-success submit-btn' onClick={submitquiz} disabled={submit? Object.keys(questions).length!=Object.keys(submit).length || submitted?true:false:true}>Submit</button>
         
                  </div>
                    </div>
         
        </div>
      
        </div>
    </div>
    </div>:
    <div className='quiz-loader'> <div className="spinner-border text-success" role="status">
        
    </div><span style={{paddingLeft:"10px"}}> Submitting...</span></div>
}
    </div>
  )
}

export default Quiz