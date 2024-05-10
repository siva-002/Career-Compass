import {React,useEffect,useState} from 'react'
import { FaCheckCircle, FaEdit, FaEnvelope, FaMobileAlt, FaPenSquare, FaSadTear, FaSpinner, FaTimesCircle, FaUserTag, } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import defaultimg from "../image/profile.png"
import Apicon from '../../Api/Apicon'
import swal from 'sweetalert'
import Updateloader from './Updateloader'
const UserHome = ({user,admins,allevents}) => {
    const nav=useNavigate()
    const [mouseover,setmouseover]=useState(false)
    const [addeventmodal,setaddeventmodal]=useState(false)
    const [subeventmodal,setsubeventmodal]=useState(false)
    const [eventdata,seteventdata]=useState()
  const [subevents,setsubevents]=useState()
const [eventload,seteventload]=useState(true)
  const [filterstatus,setfilterstatus]=useState()
  const [filtered,setfiltered]=useState()
  const [scheduleload,setscheduleload]=useState(false)
  const [eventdetailssubpanel,seteventdetailssubpanel]=useState(false)
  const [subpanelevent,setsubpanelevent]=useState()
    const handleeventdatachange=(e)=>{
      seteventdata({...eventdata,[e.target.name]:e.target.value})
    }
    useEffect(()=>{
      const arr=subevents?.filter(ele=>ele.status.includes(filterstatus))
      filterstatus?setfiltered(arr):setfiltered(subevents)
    },[filterstatus,subevents])
    useEffect(()=>{
      if(user.profession!="Student"){
       const options={method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify({email:user?.email})}
       const geteventdata=async()=>{
        const res=await Apicon("getevent",options)
        setsubevents(res.data)
        seteventload(false)
       }
       geteventdata()
       
      }
    },[admins])

    const handlesubpanelevent=(evid)=>{
      const event=allevents?.filter(ele=>ele._id==evid)
      seteventdetailssubpanel(true)
      setsubpanelevent(event[0])
    }
    const handleeventsubmit=async(e)=>{
        e.preventDefault()
        const senddata={...eventdata,userid:user._id}

        const options={
          method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(senddata)
      }

      swal({
        title: "Are you sure to schedule?",
        text: "Once submitted you can't able to edit so kindly double check the data!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async(choice) => {
        if (choice) {
          setscheduleload(true)
          const res=await Apicon("scheduleevent",options)
          console.log(res)
          setscheduleload(false)
          if(res.status==201)
            swal("Event Scheduled Successfully", {
              icon: "success",
            })
          else if(res.status==200)
          swal({
            title:"Event Scheduled Successfully",
            icon: "success",
            text:"You will be notified through email once it gets approved !"
          })
          else
          swal( {
            title:"Something Went Wrong",
            icon: "error",
            text:"Try Again Later"
          })
        } 
      })
      

    }
    const getstatus=(date)=>{
      const today=new Date()
      const evdate=new Date(date)

      const status=today.toLocaleDateString()==evdate.toLocaleDateString()?
      <span className='badge text-bg-primary '>Today</span>:
        evdate-today<0?
      <span className='badge text-bg-success event-status-home' >Finished</span>:
      <span className='badge text-bg-warning event-status-home'>Upcoming</span>
      return status
    }

  return (
    <div className='userhome'>
        {scheduleload&&<Updateloader/>}
           {addeventmodal&&
           <div className='addevent-modal'>
            <div className='addevent-con'>
              <span className='title'>Enter Event Details </span>
              <span className='close-btn badge text-bg-warning'  onClick={()=>setaddeventmodal(false)}><FaTimesCircle/></span>
              <div className='form-con'>
              <form className='event-input' onSubmit={handleeventsubmit}>
                <div><label>Title</label><input className='form-control'name="eventtitle" required onChange={handleeventdatachange}/></div>
                <div><label>Description</label><input name="eventdescription" className='form-control' required onChange={handleeventdatachange}/></div>
                <div><label>Date</label><input name="eventdate" type="date" className='form-control' required onChange={handleeventdatachange}/></div>
                <div><label>Start Time </label><input name="eventtimestart" type="time" className='form-control' required onChange={handleeventdatachange}/></div>
                <div><label>End Time</label><input name="eventtimeend" type="time" className='form-control' required onChange={handleeventdatachange}/></div>
                <div><label>Event Mode</label>
                  <select name="eventmode" className='form-control' defaultValue="" required onChange={handleeventdatachange}>
                    <option value="" disabled >Select one</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>
                {eventdata?.eventmode=="Offline"&&
                <div>
                  <label>Location</label>
                  <input name="eventlocation" className='form-control' required onChange={handleeventdatachange}/>
                </div>
                }
                 {eventdata?.eventmode=="Online"&&
                <div>
                  <label>Event Link</label>
                  <input name="eventlink" className='form-control' required onChange={handleeventdatachange}/>
                </div>
                  }
                <div>
              <input type="submit" value="Schedule" className='m-2 btn btn-primary'/>
              <input type="reset" value="Clear" className='m-2 btn btn-warning'/>
              </div>
              </form>
          
           </div>
           </div>
           </div>
           }
        {subeventmodal &&
        <div className='addevent-modal '>
        <div className='addevent-con subevent-con'>
          <span className='title'>Submitted Event Details</span>
          <select defaultValue="" className='filter-status'  onChange={(e)=>setfilterstatus(e.target.value)}>
            <option value="">none</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
          <span className='close-btn badge text-bg-warning'  onClick={()=>setsubeventmodal(false)}><FaTimesCircle/></span>
          {eventload?
          <div className='event-load'>Loading Events...</div>
          :<>
          <table className='table table-hover table-responsive m-2'>
            <thead>
          <tr>

            <th>S.no</th><th>Title</th>
            {/* <th>Description</th> */}
            <th>Date</th>
            {/* <th>Time</th> */}
            <th>Mode</th>
            {/* <th>Link/Location</th> */}
            <th>Status</th><th>Remarks</th>
          </tr>
          </thead>
          <tbody>
          {filtered?.length>0&&filtered.map((ele,index)=>(
            <tr key={index} className='p-2' style={{height:"50px"}}>
              <td>{index+1}</td>
              <td>{ele.title}</td>
              {/* <td>{ele.description}</td> */}
              <td>{ele.date}</td>
              {/* <td>{ele.time}</td> */}
              <td>{ele.mode}</td>
              {/* <td>{ele.link || ele.location}</td> */}
              <td>{ele.status=="approved"&&<span className='badge text-success' title="approved"><FaCheckCircle/></span>}
              {ele.status=="rejected"&&<span className='badge text-danger' title="rejected"><FaTimesCircle /></span>}
              {ele.status=="pending"&&<span className='badge text-info' title="pending"><FaSpinner /></span>}
              
              </td>
           <td>
            {ele.remarks || "-"}
           </td>
            </tr>
       
          ))
         
          } </tbody><tfoot></tfoot>
          </table>
          {!filtered?.length&&
            <div className="nodatarow"><span className="nodata"> <FaSadTear/> No Data Found</span></div>
             
          }
          </>}
        </div>
    
        </div>
        }
         {!addeventmodal && !subeventmodal &&    
        <div className='user-detail-home'>
          <div className='pro-con'>
        <span className='title'>PROFILE</span>
            <div className='profile-container'>
    
            <span className='edit-profile' onClick={()=>nav("/user/profile")}> <FaEdit /> </span>
            <div className='img'>
            <img src={user?.profilepic || defaultimg}/>
            </div> 
            <div className='user-info'>
            <span className='username'>{user?.name}</span>
            <span className='useremail'> <span><FaEnvelope/></span> <span>{user?.email}</span></span>
            <span className='usermobile'><span><FaMobileAlt/></span><span>{user?.mobile}</span></span>
            <span className='userprofession '><span><FaUserTag/></span><span>{user?.profession}</span></span>
            </div>
            </div>
            </div>
            <div className="events-container">
              <span className="title">Events</span>
              {eventdetailssubpanel&&
               <div className='events-details-sub-panel'>
                <span className='badge text-bg-warning close-btn' onClick={()=>seteventdetailssubpanel(false)}><FaTimesCircle/></span>
                 <b>{subpanelevent?.title}</b> <br/>{subpanelevent?.description}<br/> {
                  subpanelevent?.mode?.toLowerCase() === "online" ? 
                 <> This event will take place online from <span className='highlight'>{subpanelevent?.time}</span> on  <span className='highlight'>{subpanelevent.date}</span> <a href={subpanelevent?.link} target="_blank" >Click here</a></>: 
                  <>  This event will be held offline at <span className='highlight'>{subpanelevent?.location}</span> from <span className='highlight'>{subpanelevent?.time} </span>on   <span className='highlight'>{subpanelevent.date}</span></>
                    }
              
                   
                </div>
            }
              <div className='events '>
     
               <ul  className={`scroll-animation ${mouseover?"pause-anim":""}`} onMouseOver={()=>setmouseover(true)} onMouseOut={()=>setmouseover(false)}>
               {allevents?.filter(ele=>ele.status=="approved").sort((a,b)=>new Date(a.date)-new Date(b.date)).map((ele,index)=>(
                <div key={index} onClick={()=>handlesubpanelevent(ele._id)} >
                <li>{ele.title} on {ele.date} {getstatus(ele.date)}</li>
               
                </div>
               ))}
               
                 </ul>
              </div>

         
            </div>
            {user?.profession!="Student" &&
            <div className='title'>
                <div>Events</div>
              <button className='mt-2 btn btn-primary' onClick={()=>setaddeventmodal(true)}> Add Event</button>
              &nbsp;&nbsp;
              <button className='mt-2 btn btn-success' onClick={()=>setsubeventmodal(true)}>Submitted Events</button>
              </div>
            }
        </div>
}
    </div>
  )
}

export default UserHome