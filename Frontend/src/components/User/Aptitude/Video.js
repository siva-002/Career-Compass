import React, { useEffect, useState } from 'react'
import { FaTimesCircle } from 'react-icons/fa'

const Video = ({setshowvideo,topic}) => {
    const [link,setlink]=useState()
    useEffect(()=>{
    switch(topic){
        case "Probability":
            setlink("https://www.youtube.com/embed/ximxxERGSUc?si=w-7Z6V7_nCNnYqY5")
            break;
        case "Averages":
            setlink("https://www.youtube.com/embed/rhSxQ4ieAYc?si=rjXo6uTxLROh1Vk2")
            break;
        case "Time and Work":
            setlink("https://www.youtube.com/embed/KE7tQf9spPg?si=ojbLBI_cDhm5sE-7")
            break;
        case "Ratio and Proportion":
            setlink("https://www.youtube.com/embed/jfoJBivWlnQ?si=7lGsaW8vM7YmH0Jx")
            break;
        case "Percentages":
            setlink("https://www.youtube.com/embed/RWdNhJWwzSs?si=l3mkiiveSPZfFG6Z")
            break;
        case "Pipes and Cisterns":
            setlink("https://www.youtube.com/embed/mBtBD1N7ywQ?si=Ecqjk6mZCV6rfYtp")
            break;
        case "Permutations and Combinations":
            setlink("https://www.youtube.com/embed/ETiRE7N7pEI?si=AfOWFqC33fGi-JdC")
            break;
        case "Work and Wages":
            setlink("https://www.youtube.com/embed/8OOBo5C7dsc?si=mxJjGRAAVeWZXopf")
            break;
        case "Boats and Streams":
            setlink("https://www.youtube.com/embed/-EdJ4kAW-j4?si=hlsrUerQfGWPBoYL")
            break;
        case "Arithmetic":
            setlink("https://www.youtube.com/embed/G-gqX4Oo9PA?si=j05y2armlAtisSJv")
            break;
        case "Algebra":
            setlink("https://www.youtube.com/embed/TV9rQm15sWo?si=B_mil1BVqTBJgJtK")
            break;
        case "Geometry and Mensuration":
            setlink("https://www.youtube.com/embed/rdC4Blp8qmk?si=Ee_GCz9id_a43Beo")
            break;
        case "Number Systems":
            setlink("https://www.youtube.com/embed/vsBpWgNYjtQ?si=Vf-OAHy14T6wlNI-")
            break;
        case "Trains":
            setlink("https://www.youtube.com/embed/78b4Jn4rw44?si=la91a9tW0m_16Bgq")
            break;
        case "Profit and Loss":
            setlink("https://www.youtube.com/embed/T2odvmxqi1I?si=La3w8kIxcL2Tabiq")
            break;
        case "Simple Interest":
            setlink("https://www.youtube.com/embed/jvRq87ZWzIk?si=iFikvgGyQSvKKP0e")
            break;
        case "Compound Interest":
            setlink("https://www.youtube.com/embed/PbUZnzncmR4?si=5mnnhSrt09PxSH5V")
            break;
    }
    console.log(link)
    },[topic])
  return (
    <div>
         <span className="close-video badge text-bg-warning" onClick={()=>setshowvideo(false)}><FaTimesCircle/></span>
         <span className='badge text-bg-primary video-title'>{topic} </span>

         <iframe width="560" height="315"
          src={link}
           title="YouTube video player"
            frameBorder="0"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen={true} webkitallowfullscreen="true" mozallowfullscreen="true"
              >

            </iframe>

    </div>
  )
}

export default Video