import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Apicon from '../../Api/Apicon'
import { ToastContainer, toast } from 'react-toastify'

const Addquiz = ({data,admins}) => {
    const admin=["vsivakumar971@gmail.com"]
    const [input,setinput]=useState([1])
    const [opt,setopt]=useState(1)
    const [datas,setdatas]=useState([])

    const [questions,setquestions]=useState()
    const [options,setoptions]=useState()
    const [solution,setsolution]=useState()
    const [answers,setanswers]=useState()
    const [schedule,setschedule]=useState()
    const [topic,settopic]=useState()

    const addfield=()=>{
        setinput([...input,0])
        setopt((opt)=>opt+1)
    }
    const handlequestions =(e,index)=>{
       setquestions({...questions,[index]:e.target.value})
    }
    const handleoptions=(e,index)=>{
        setoptions({...options,[index]:e.target.value})
    }
    const handleanswer=(e,index)=>{
        setanswers({...answers,[index]:e.target.value})
    }
    
    const handlesolution=(e,index)=>{
        setsolution({...solution,[index]:e.target.value})
    }
    const handleaddquizsubmit=async(e)=>{
        e.preventDefault()
        //schdeuled questions quizanswers
        
            const data={aptitudetopic:topic,scheduled:new Date(),questions:questions,options:options,quizanswers:answers,solution:solution}
            const postoptions={
                method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)
            }
            const res=await Apicon("addquiz",postoptions)
            toast.info(res.msg)
            setinput([])
        
    } 
    
   return (
    <div className='addquiz'>{
        admins?.includes(data.email)?
        <div >
            <ToastContainer/>
            
        {/* <h2>Add Quiz</h2> */}
 
       
        <form onSubmit={handleaddquizsubmit}>
            <label>Topic</label>
            <input type="text" name="topic" required onChange={(e)=>settopic(e.target.value)} className='form-control'/>
            {input.map((i,index)=>(
                (opt==index+1)?
                <div key={index} className='addquizpanel'>
                    <div>
            <label>Enter Question {index+1}</label>
            <input required type="text" name={`question${index}`} className='form-control' onChange={(e)=>handlequestions(e,index)}/>
            </div><div>
            <label>Enter Options Separated by Commas</label>
            <input required type="text" name={`options${index}`} className='form-control' onChange={(e)=>handleoptions(e,index)}/>
            </div><div>
            <label>Enter Answer</label>
            <input required type="text" name={`answers${index}`} className='form-control' onChange={(e)=>handleanswer(e,index)}/>
            </div>
            <div>
             <label>Solution points should be sepated by semicolon(;)</label>  
             <textarea cols="30" rows="10" className='form-control' onChange={(e)=>handlesolution(e,index)}/> 
             </div>
                
                </div>:""
            ))}
      

                  

            <br/>
            <br/>
            <button onClick={()=>addfield()} className='btn btn-primary' >Add Question</button>
            &nbsp;&nbsp;
            <input type="submit" className='btn btn-success'/>
            
            
        </form>
        </div>:
        <div>
            <h3 style={{color:"red",display:"flex",justifyContent:"center"}}>Access Denied</h3>
        </div>
        }</div>
  )
}

export default Addquiz