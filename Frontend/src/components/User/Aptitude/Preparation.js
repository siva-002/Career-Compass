import {React,useState} from 'react'
import "../../css/Aptitudestudy.css"
import { FaHandPointRight, FaInfoCircle, FaStar, FaTimesCircle } from "react-icons/fa"
import Video from './Video'

const Preparation = () => {
  const [showvideo,setshowvideo]=useState(false)
  const [topic,settopic]=useState()

  const showvideopanel=(e)=>{
    settopic(e.target.innerHTML)
    setshowvideo(true)
  }
  return (
    <div className='study'>
        {/* <div className='title badge text-primary'>Aptitude Preparation</div> */}
        <div className='topics'>
            {showvideo?
       <div className="video-panel">
        <Video setshowvideo={setshowvideo} topic={topic}/>
       </div>
       :
        <ul className='topics-con'>
       
            <li>
            {/* <span className='badge'><span className='text-primary'> <FaInfoCircle/> </span><span className='text-primary'>Important topics are markes as <span style={{color:"red"}}>*</span></span></span> */}
        
            <h3>Quantiative Aptitude</h3>
            <ul className='study-topics-container'>
            <li className='important video-available' onClick={showvideopanel} value="Probability">Probability</li>
            <li className='important video-available'  onClick={showvideopanel}>Averages</li>
            <li className='important video-available'  onClick={showvideopanel}>Time and Work</li>
            <li className='important video-available'  onClick={showvideopanel}>Work and Wages</li>
            <li className='important video-available'  onClick={showvideopanel}>Ratio and Proportion</li>
            <li className='important video-available'  onClick={showvideopanel}>Percentages</li>
            <li className='important video-available'  onClick={showvideopanel}>Simple Interest</li>
            <li className='important video-available'  onClick={showvideopanel}>Compound Interest</li>
            <li className='important video-available'  onClick={showvideopanel}>Profit and Loss</li>
            <li className='important video-available'  onClick={showvideopanel}>Pipes and Cisterns</li>
            <li className='important video-available'  onClick={showvideopanel}>Boats and Streams</li>
            <li className='important video-available'  onClick={showvideopanel}>Trains</li>
            <li className='important video-available'  onClick={showvideopanel}>Permutations and Combinations</li>
            <li className='video-available '  onClick={showvideopanel}>Arithmetic</li>
            <li className='video-available '  onClick={showvideopanel}>Algebra</li>
            <li className='video-available '  onClick={showvideopanel}>Geometry and Mensuration</li>
            <li className='video-available important'  onClick={showvideopanel}>Number Systems</li>
            </ul>
        </li>

  <li>
    <h3>Logical Reasoning</h3>
    <ul className='study-topics-container'>
      <li>Coding and Decoding</li>
      <li className='important'>Blood Relations</li>
      <li className='important'>Seating Arrangement</li>
      <li>Syllogism</li>
      <li>Analogy</li>
      <li className='important'> Directions</li>
      <li>Data Sufficiency</li>
      <li>Puzzle Solving</li>
    </ul>
  </li>
  <li>
    <h3>Verbal Ability</h3>
    <ul className='study-topics-container'>
      <li>Reading Comprehension</li>
      <li>Vocabulary</li>
      <li>Grammar</li>
      <li>Para Jumbles</li>
    </ul>
  </li>
  <li>
    <h3>Data Interpretation</h3>
    <ul className='study-topics-container'>
      <li>Tables</li>
      <li>Bar Graphs</li>
      <li>Pie Charts</li>
      <li>Line Graphs</li>
      <li>Caselets</li>
    </ul>
  </li>


</ul>
}
        </div>
    </div>
  )
}

export default Preparation