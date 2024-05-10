import React, { useState } from 'react'
import { FaTimesCircle } from 'react-icons/fa'
import { add } from 'scrollspy'
import Apicon from '../../Api/Apicon'
import swal from 'sweetalert'
import { AnimatePresence, motion } from 'framer-motion'

const Addquestion = ({modal,loginuser}) => {
    const [addquestion,setaddquestion]=useState({})
    const [postload,setpostload]=useState(false)
    const handlechange=(e)=>{
        setaddquestion({...addquestion,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
       e.preventDefault() 
       setpostload(true)
        const appenddata={date:new Date(),userid:loginuser._id}
        const data={...addquestion,...appenddata}
        const options={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}
        const res=await Apicon("addpost",options)
       setpostload(false)
       if(res.status==201){
        swal({
            title:"Question Successfully Posted",            
            icon:"success"
        })
       }else{
        swal({
            title:"Something Went Wrong",
            text:"Please Try Again Later",
            icon:"warning",
            dangerMode:true
        })
       }
    }
  return (
   
    <div className='addquestion' >
      
        <motion.form onSubmit={handleSubmit}
            initial={{y:'-100vh',opacity:0}}
            animate={{y:0,opacity:1}}
            transition={{type:"spring",stiffness:150}}
            exit={{y:"-100vh",opacity:0,transition:{duration:0.3}}}
        >
        <span className='closebtn text-warning' onClick={()=>modal(false)}><FaTimesCircle/></span>
            <div>
            <label>Title</label>
            <input type='text' required className='form-control' onChange={handlechange} name="title"/>
            </div>
            <div>
            <label>Description</label>
            <textarea cols="50" required rows="10" type='text' className='form-control' onChange={handlechange} name="description"/>
            </div>
            <div>
                <button className='btn btn-primary' disabled={postload?true:false}>
                <span>
            {(postload)?( 
            <span className="mt-1 spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
                
                ):"Post"}</span>
                </button>
            </div>
              </motion.form>
     
    </div>

  )
}

export default Addquestion