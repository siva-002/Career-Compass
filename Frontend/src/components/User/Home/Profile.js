import { faCamera, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer,Zoom,toast } from 'react-toastify'
import { imgpath } from '../../Api/Link'
import UserDetailsContext from '../../context/UserDetails'
import profilepic from "../image/profile.png"
import Loader from '../Loader'

import UserNavbar from '../UserNavbar'
import Authverify from '../Authverify'
import SessionMessage from '../SessionMessage'
const Profile = () => {
    const {loginload,sessionexpiry,loginuserdata,updatedata,setupdatedata,imgfile,Auth,fileupload,handleformupdate,error,updateload} =useContext(UserDetailsContext)
    const [path,setpath]=useState()


 const handleupdatechange=(e)=>{
  setupdatedata({...updatedata,[e.target.name]:e.target.value})
 }
 const handleupdatesubmit=async(e)=>{
  e.preventDefault()

  const res=await handleformupdate()
  if(res.status==201){
    toast.success("Updated Successfully")
  }else if(res.status==200){
    toast.info(`${res.msg}`,{transition:Zoom })
  }else{
    toast.error("Try again later")
  }
 }
  return (
    // <>{sessionexpired?<span className='session-info'>Session Expired <Link to="/signin">Login here</Link> </span> :

    <div className='profile'>

        <div className='form-con'>
        <ToastContainer  transition={Zoom } />
       <form  encType='multipart/form-data' onSubmit={handleupdatesubmit}>
        <span className="badge text-bg-primary mb-2">Edit Profile</span>
          <div className='img-con'>
            
            <img src={imgfile!=null?imgfile:loginuserdata?.profilepic?loginuserdata.profilepic:profilepic}/>
            <label htmlFor='file-upload'><FontAwesomeIcon icon={faCamera} /></label>
            <input type="file" onChange={fileupload} className='file-upload' id="file-upload" accept='image/*' name="image_upload"/>
          </div> 
          <div>
         <div className='error'>{error}</div>
         
         <div className='user-input'>
        <div><label>Name</label><input required type="text" className='form-control' name="name" onChange={handleupdatechange} value={updatedata?.name} title="Username"/>
</div>        <div><label>Email</label><input required type="email"  className='form-control' name="email" onChange={handleupdatechange}  value={updatedata?.email} title="Email"/>
</div>        <div><label>Date Of Birth</label><input required type="date"  className='form-control' name="dob" onChange={handleupdatechange}  value={updatedata?.dob} placeholder='Date Of Birth' title="Date Of Birth"/>
</div>        <div><label>Mobile No</label><input required type="number"  className='form-control' name="mobile" onChange={handleupdatechange}  value={updatedata?.mobile} placeholder='Phone no' title='Mobile Number' />
 </div>      
       <div>
       <label>Profession</label>
       <select name="profession" value={updatedata?.profession} onChange={handleupdatechange} required>
            <option></option>
            <option value="Student">Student</option>
            <option value="Teaching Staff">Teaching Staff</option>
            <option value="Worker">Worker</option>
            <option value="Entrepreneur">Entrepreneur</option>
            <option value="Freelancer">Freelancer</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Others">Others</option>
          </select>
       </div>
      
       {updatedata?.profession=="Student"?<>
       <div><label>Department</label>
          <select name="department" value={updatedata?.department} onChange={handleupdatechange} required >
            <option></option>
            <option value="CSE">CSE</option>
            <option value="MECH">MECH</option>
            <option value="ECE">ECE</option>
            <option value="CIVIL">CIVIL</option>
            <option value="EEE">EEE</option>
            <option value="Others">Others</option>
          </select>
       </div>
      <div><label>Year</label>
          <select name="year" value={updatedata?.year} onChange={handleupdatechange} required>
            <option></option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>           
          </select>
     </div>
     <div>
        <label>Area Of Interest</label>
      <input  className='form-control' style={{width:"100%"}} name="area_of_interest" required type="text" placeholder="Ex:Web dev / App dev ..." value={updatedata?.area_of_interest} onChange={handleupdatechange}/>
    </div>
     </>:<>
        <div>
         <label>Domain</label>
       <input  className='form-control' style={{width:"100%"}} name="domain" required type="text" placeholder="" value={updatedata?.domain} onChange={handleupdatechange}/>
     </div>
     </>
     }
         {updatedata?.profession=="Worker"&& <div>
         <label>Company Name</label>
       <input  className='form-control' style={{width:"100%"}} name="company" type="text" placeholder="" value={updatedata?.company} onChange={handleupdatechange}/>
     </div>}
  <div>
         <label>Skills</label>
       <input  className='form-control' style={{width:"100%"}} name="skills" required type="text" placeholder="" value={updatedata?.skills} onChange={handleupdatechange}/>
     </div>
 
 
        </div> 
         </div> 
         <button required type='submit' className='mt-3 btn btn-warning'>
        {(updateload)?(<span className="spinner-border spinner-border-sm" role="status" ></span>
          ):
          "Update" }</button>
        </form>
   
        </div>
    </div>

  )
}
export default Profile
  