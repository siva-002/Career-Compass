import { FaAssistiveListeningSystems, FaBullhorn, FaInfoCircle, FaSoundcloud, FaSpeakap, FaSpeakerDeck, FaTeamspeak, FaTimes, FaTimesCircle, FaVolumeUp } from "react-icons/fa"
import "../../css/Modal.css"
import { useContext, useState } from "react"
import { AptitudeContext } from "../../context/Aptitude"
import { useEffect } from "react"
import { FixedSizeList } from 'react-window';

const Modal=({setmodalopen,modaltitle})=>{
        const {quiz,submittedquizdata}=useContext(AptitudeContext)
        const [wrong,setwrong]=useState([])
        const [data,setdata]=useState()
        const [wronganswered,setwronganswered]=useState()
        const [correctanswer,setcorrectanswer]=useState()
        const [topiccount,settopiccount]=useState()
        const [sound,setsound]=useState(false)
        const [showansmodal,setshowansmodal]=useState()

        const [quizanswer,setquizanswer]=useState()
        useEffect(()=>{
            const dt=[]
            submittedquizdata?.quizzes.map((item)=>{
                // console.log(ele)       
                const wr=[]     
                item.wrong_ans.map((ele)=>{
                        wr.push(ele)
                })   
                dt.push({quizid:item.quizid,wrong:wr})
                // setwrong({...wrong,[item.quizid]:wr}) 
            })
            setwrong(dt)
             
        },[submittedquizdata])
        useEffect(()=>{
            const getquiz=[]
 
            quiz?.map(ele=>{
                getquiz.push({quizid:ele.quizid,questions:ele.questions,answers:ele.answers,topic:ele.topic})
            })
           
          setdata(getquiz)
        },[wrong])
        useEffect(()=>{
            const newwr=[]
            const newans=[]
            wrong.map(ele=>{
                const og=data.find(o=>o.quizid == ele.quizid)
       
               for(let x in og.questions[0]){
                if(og.quizid==ele.quizid && ele.wrong.includes(x))
                newwr.push({id:og.quizid,qid:x,topic:og.topic,wrong:og.questions[0][x]})
               }
               ele.wrong.map(item=>{
               if(og.quizid == ele.quizid)
                  newans.push(og.answers[0][item])
               })
            })
            
            if(newwr){
                setwronganswered(newwr)
                setcorrectanswer(newans)
            }
        },[data])
        useEffect(()=>{
           const count= wronganswered?.reduce((acc,item)=>{
                const topic=item.topic
                acc[topic]=(acc[topic] || 0)+1
                return acc
            },{})
            const data=[]
           for(let x in count){
                data.push({title:x,total:count[x]})
           }
           settopiccount(data)
        },[wronganswered])

        const handleshowansmodal=(quizid,qid)=>{
            const findquiz=quiz.filter((ele)=>ele.quizid==quizid)
            setquizanswer(findquiz[0].solution[0][qid])
            setshowansmodal(true)
            console.log("open")
        }
        
        const Row = ({ index, style }) => (
                <div style={style}>
                <table className="table table-bordered table-hover table-responsive" >
                <tbody>
                <tr>
                    <td style={{width:"10%"}}>{index + 1}</td>
                    <td style={{width:"10%"}}>{wronganswered[index].topic}</td>
                    <td style={{width:"50%"}}>{wronganswered[index].wrong}</td>
                    <td style={{width:"15%"}}>{correctanswer[index]}</td>
                    <td style={{width:"15%"}}   className="open-solution" ><span className="text-primary" onClick={()=>handleshowansmodal(wronganswered[index].id,wronganswered[index].qid)}><FaInfoCircle/></span></td>
                </tr>
                </tbody>
            </table>
            </div>
         
          
          )

        const suggestion=()=>{
          
            const sorted=topiccount.sort((a,b)=>b.total-a.total)
            
            const msgdata=
            sorted.length?
            `Based on your test results you wrongly answered for 
            ${sorted?.map((ele)=>{
                return (`${ele?.title} ${ele?.total} questions`)
            })}.
            you mostly wrong answered topic was ${sorted[0].title} so prepare well in this topic
            `:"You did not attended any tests"
            const msg=new SpeechSynthesisUtterance()
            msg.text=msgdata
            msg.rate=0.7
            msg.voice=speechSynthesis.getVoices()[1]
            msg.onstart=()=>{
                setsound(true)
            }
            msg.onend=()=>{
                setsound(false)
            }
            speechSynthesis.speak(msg)
            // setsound(false)
        }
    return(
     <div className="modal-content">
           {showansmodal&&
          <div className='show-ans-modal'>
            <div>
            <span className='close-info badge text-bg-warning' onClick={()=>setshowansmodal(false)}><FaTimesCircle/></span>
            <span className='badge text-bg-primary'> Solution</span>
            <br/>
            <span>
              <ul>
            {quizanswer?.split(";").map((ele,index)=>(
                <li key={index}>{ele}</li>
            ))
            
            
            }

              </ul>
            </span>
            </div>
          </div>
            }
        <button className="badge text-light text-bg-warning" onClick={()=>setmodalopen(false)}><FaTimesCircle/></button>
         <div className="">
            <div className="title badge  text-primary">{modaltitle}</div>
            {modaltitle=="tests completed"&&
            <table className="table table-bordered table-hover table-responsive">
              <thead><tr><th>S.no</th><th>Topic</th><th>Submitted On</th><th>Points</th><th>Total Questions</th><th>Elapsed Time</th></tr></thead> 
              <tbody >
                {submittedquizdata?.quizzes?.sort((a,b)=>new Date(b.submitted_on) - new Date(a.submitted_on)).map((ele,index)=>(          
                 <tr key={index}>
                 <td>{index+1}</td>
                 <td>{ele.topic}</td>
                 <td>{ele.submitted_on.substr(0,10)}</td>
                 <td>{ele.correct_ans}</td>                 
                 <td>{ele.totalquestion}</td>                 
                 <td title="hour:min:sec">{ele.time}</td>                 
                 </tr>
                ))}
                </tbody> 
                <tfoot></tfoot>
            </table>
            }
            {modaltitle=="wrong answers"&&
            <>
            <div className="show-topic">
                {topiccount?.map((ele,index)=>(
                <div className="topic-item " key={index}>
                    <span  className="badge text-bg-warning position-relative">
                        {ele.title}
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {ele.total}
                        
                        </span>
                        </span>
                </div>
                ))}
                <div className="sound-info">
                    {sound?<>
                    <FaVolumeUp/>
                    <div className="badge text-warning">
                    <FaTimesCircle  onClick={()=>speechSynthesis.cancel()}/>
                    </div>
              
                    </>
                    :
                    <FaBullhorn onClick={suggestion}/>
                    }
                </div>

            </div>
         
            <table className="table table-bordered table-hover table-responsive">
            <thead><tr><th style={{width:"10%"}}>S.no</th><th style={{width:"10%"}}>Topic</th><th style={{width:"50%"}}>Question</th><th style={{width:"15%"}}>Correct Answer</th><th style={{width:"15%"}}>Solution</th></tr></thead> 
            <tfoot>
            </tfoot>
            </table>
            <div>
            {
             
                    <FixedSizeList
                    height={500}// Height of the list
                    itemCount={wronganswered ? wronganswered.length : 0} // Total number of items
                    itemSize={100} // Height of each individual item
                    width="100%" // Width of the list
                    >
                    {Row}
                </FixedSizeList>
         
            }
            </div>
         
            </>
            }
        </div>
     </div>
    )
}

export {Modal}