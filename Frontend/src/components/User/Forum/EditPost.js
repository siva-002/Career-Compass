import React, { useEffect, useState } from 'react'
import { FaTimesCircle } from 'react-icons/fa'
import { motion } from 'framer-motion'
import Apicon from '../../Api/Apicon'
import swal from 'sweetalert'
const EditPost = ({seteditpostmodal,editpostdata,seteditpostdata}) => {
    const [editpostload,seteditpostload]=useState(false)
    const handleeditchange=(e)=>{
        seteditpostdata({...editpostdata,[e.target.name]:e.target.value})
    }
    const handleeditsubmit=async(e)=>{
        e.preventDefault()
        seteditpostload(true)
        const data={...editpostdata,date:new Date()}
        const options={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}
        const res=await Apicon("editpost",options)
        seteditpostload(false)
        if(res.status==201){
            swal({title:"Updated Successfully",icon:"success"})
        }else{
            swal({title:"Something Went Wrong" ,icon:"warning",dangerMode:"true",text:"Try Again Later"})
        }
    }
  return (
    <div className='editpost'>
        <motion.div className='edit-con'
           initial={{y:'-100vh',opacity:0}}
           animate={{y:0,opacity:1}}
           transition={{type:"spring",stiffness:150}}
           exit={{y:"-100vh",opacity:0,transition:{duration:0.3}}}
        >
            <span className='badge text-warning' onClick={()=>seteditpostmodal(false)}><FaTimesCircle/></span>
            <form onSubmit={handleeditsubmit}>
                <div>
                    <label>Title</label>
                    <input className='form-control' value={editpostdata?.title} name="title" onChange={handleeditchange}/>
                </div>
                <div>
                    <label>Description</label>
                    <textarea cols="50" rows="10" className='form-control' value={editpostdata?.description} name="description" onChange={handleeditchange}/>
                </div>
                <div>
                    <motion.button className='btn btn-success'
                    whileHover={{scale:1.1}}
                    whileTap={{scale:0.9}}
                    >                        
                    {(editpostload)?( <span className="mt-1 spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>               
                     ):"Update"}                        
                    </motion.button>
                </div>
            </form>
        </motion.div>
    </div>
  )
}

export default EditPost