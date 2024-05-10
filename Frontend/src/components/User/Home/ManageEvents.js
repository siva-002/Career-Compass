import React, { useState } from 'react'
import { useEffect } from 'react'
import { FaInfoCircle,FaCheckCircle,FaSpinner,FaTimesCircle ,FaSadTear, FaTrashAlt} from 'react-icons/fa'
import swal from 'sweetalert'
import Apicon from '../../Api/Apicon'
import Updateloader from './Updateloader'
import Viewuser from './Viewuser'

const ManageEvents = ({admins,allevents,loginemail,setallevents,users}) => {
    const [filterstatus,setfilterstatus]=useState()
    const [filtered,setfiltered]=useState("")
    const [detailpanel,setdetailpanel]=useState(false)
    const [paneleventid,setpaneleventid]=useState()
    const [panelevent,setpanelevent]=useState()
    const [updateventload,setupdateeventload]=useState(false)
    const [eventstatus,seteventstatus]=useState("")
    const [viewusermodal,setviewusermodal]=useState(false)
    const [viewuseremail,setviewuseremail]=useState()
    useEffect(()=>{
        const arr=allevents?.filter(ele=>ele.status.includes(filterstatus))
        filterstatus?setfiltered(arr):setfiltered(allevents)
       
    },[filterstatus,allevents])
    
    const updateevent=async(action,msg)=>{
        setupdateeventload(true)
        const data={
            eventid:panelevent._id,
            remark:msg,
            status:action,
            email:panelevent.posted_by,
            approver:loginemail
        }
        const ev=allevents.find((ele)=>ele._id==panelevent._id)
        ev.status=action
        setallevents([...allevents],ev)
        console.log(ev)
        const options={method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(data)}
        const res=await Apicon("updateevent",options) 
        setupdateeventload(false)
        return res
    }
    useEffect(()=>{
        const find=allevents?.filter(ele=>ele._id==paneleventid)
        find&&setpanelevent(find[0])
    },[paneleventid,allevents])
    const handleadminaction=async()=>{
        swal({
            title:"!Action Needed",
            icon: "info",
            text:"Approve or Reject the Event ",
            buttons:{
                Reject:{
                    value:false,
                    text:"Reject"
                },
                Approve:{
                    value:true,
                    text:"Approve"
                }
           
            }
          }).then(async(val)=>{
    
            if(val){
  
                const res= await updateevent("approved","")
                res.status==201?
                swal({
                    title:"Event Approved",
                    icon: "success",
                    text:"The user will notified through email regarding this event"
                }):
                res.status==200?
                swal({
                    title:"No Changes Made",
                    icon: "info",
               }):
               swal({
                title:"Something Went Wrong",
                icon: "warning",
                text:"Try Again Later"
           })
            }else{
                swal("Reason to Reject",{
                    content:"input",    
                    button:{
                        text:"Reject"
                    }                
                }).then(async(val)=>{
                    const res= await updateevent("rejected",val)
                    console.log(res)
                    res.status==201?
                    swal({
                        title:"Event rejected",
                    icon: "warning",
                    text:"The user will notified through email regarding this rejection " ,
                    dangerMode:true
                    }):   res.status==200?
                    swal({
                        title:"No Changes Made",
                        icon: "info",
                   }):
                   swal({
                    title:"Something Went Wrong",
                    icon: "warning",
                    text:"Try Again Later"
               })
                })
            }
          })
    }
    const getstatus=(date,evstatus)=>{
        const today=new Date()
        const dt=new Date(date)
        const status=dt-today
        return today.toLocaleDateString() === dt.toLocaleDateString()?"Today"
        :status<0&&evstatus.toLowerCase()=="approved"?"Completed":
        status<0&&evstatus.toLowerCase()=="pending"?"Expired":
        evstatus.toLowerCase()=="rejected"?"Rejected":"Upcoming"
    }
    const handledeleteevent=(id,title)=>{
        setdetailpanel(false)
        swal({
            title:`Are you sure to delete ${title} event permanently`,
            buttons:true,
            dangerMode:true,
            icon:"warning"
        }).then(async(val)=>{
            if(val){
                setupdateeventload(true)
                const data={eventid:id}
                const options={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}
                const res=await Apicon("deleteevent",options)
                console.log(res)
                setupdateeventload(false)
                if(res.status==201){
                const ev=allevents?.filter((ele)=>ele._id!=id)
                setallevents(ev)
                swal({
                    title:`Event Deleted Successfully`,
                    icon:"success"
                })
                }
                else
                swal({
                    title:`Something Went Wrong`,
                    icon:"info"
                })
            }else{
                swal({
                    title:`Event Not Deleted`,
                    icon:"info"
                })

            }
        })
    }
    const handleviewusermodal=(poster,evid,evdate,evstatus)=>{
        setviewuseremail(poster)
        setdetailpanel(true);
        setpaneleventid(evid);
        seteventstatus(getstatus(evdate,evstatus))
        setviewusermodal(true)
    }
  return (
    <div>
        {admins?.includes(loginemail)?
        <div className='manageevents'>
            {updateventload&&<Updateloader/>}
            <Viewuser users={users} viewusermodal={viewusermodal} setviewusermodal={setviewusermodal} viewuseremail={viewuseremail}/>
            {detailpanel &&
                <div className='detail-panel-modal'>
                    <span className='close-btn badge text-bg-warning' onClick={()=>{setdetailpanel(false);setviewusermodal(false)}}><FaTimesCircle/></span>
                    <span className='badge text-primary'>Event Details</span>
                    <div className='details'>
                        <div><label>Title</label><span>{panelevent?.title}</span></div>
                        <div><label>Description</label><span>{panelevent?.description}</span></div>
                        <div><label>Posted By</label><span>{panelevent?.posted_by}</span></div>
                        <div><label>Mode</label><span>{panelevent?.mode}</span></div>
                        <div><label>Date</label><span>{panelevent?.date}</span></div>
                        <div><label>Time</label><span>{panelevent?.time}</span></div>
                        <div>
                            {panelevent?.mode=="Online"?
                           <> <label>Link</label><span>{panelevent?.link}</span></>:
                           <> <label>Location</label><span>{panelevent?.location}</span></>
                            }
                        </div>
                        <div><label>Status</label><span className={`${panelevent?.status == "approved" ? 'text-success' : (panelevent?.status == "rejected" ? 'text-danger' : 'text-primary')}`}>{panelevent?.status}</span></div>
                        <div><label>Action</label><span>{
                        panelevent?.status=="pending" && 
                        eventstatus.toLowerCase()!="expired"?
                        <>
                        <button className='btn btn-warning' onClick={handleadminaction} >
                            Click
                        </button>
                        </>
                        :eventstatus.toLowerCase()=="expired"?
                        <span className='badge text-bg-danger completed'>Event Expired</span>
                        :
                        
                        <><span className='badge text-bg-success completed'>No Action Needed</span>
                        </>}
                        </span>
                        </div>
                        {panelevent?.status=="approved"&&
                        <div><label>Approved By</label><span className='badge text-warning completed'>{panelevent?.approved_by}</span></div>
                        }
                    </div>
                    </div>}
            <div className='title'><span>Manage Events</span>
            <select defaultValue="" className='filter-status'  onChange={(e)=>setfilterstatus(e.target.value)}>
            <option value="">none</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select> </div>
            
            <div className='events-container'>
                
           
                        <div className='all-events'>
                            {filtered?.length>0&&filtered?.sort((a,b)=>new Date(a.date)-new Date(b.date)).map((ele,index)=>(
                            <div className='event'  key={index}>
                                    <div className='text-danger delete' onClick={()=>handledeleteevent(ele._id,ele.title)}><FaTrashAlt/></div>
                            <div onClick={()=>handleviewusermodal(ele.posted_by,ele._id,ele.date,ele.status)}>
                                <div className='title'>{ele.title.toUpperCase()}</div>
                                <div className='status'>
                {ele.status=="approved"&&<span className='badge text-success' title="approved"><FaCheckCircle/></span>}
              {ele.status=="rejected"&&<span className='badge text-danger' title="rejected"><FaTimesCircle /></span>}
              {ele.status=="pending"&&<span className='badge text-info' title="pending"><FaSpinner /></span>}
            
                                
                                </div>
                           <div className={`evstatus ${getstatus(ele.date, ele.status)}`}>{getstatus(ele.date, ele.status)}</div>

                                <div className='poster'>{ele.date} {ele.time}</div>
                                </div>
                            </div>
                            ))}
                        </div>     
                <div>
                {!filtered?.length&&
                <div className="nodatarow"><span className="nodata"> <FaSadTear/> No Data Found</span></div>
                    }
                    </div>
            </div>
        </div> :   
        <div>
            You dont have Permission to access this page
        </div>    
        }
    </div>
  )
}

export default ManageEvents