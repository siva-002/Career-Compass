const Event=require("./eventschema")
const User = require("./dbschema");
const { ObjectId } = require("mongodb");
const Admin=require("./adminschema");
const { eventnotification, eventpermissionnotification, notifyposteduser } = require("./Notification");

const scheduleevent=async(req,res)=>{
    try{
        const id=req.body.userid
        const title=req.body.eventtitle
        const desc=req.body.eventdescription
        const date=req.body.eventdate
        const mode=req.body.eventmode
        const loc=req.body.eventlocation
        const link=req.body.eventlink
        const sttime=req.body.eventtimestart
        const endtime=req.body.eventtimeend
        const ftime=`${sttime} - ${endtime}`

       const userdetail=await User.findOne({_id:new ObjectId(id)})
       const isAdmin=await Admin.findOne({email:userdetail.email})

       if(isAdmin){
        const data={title:title,description:desc,
            date:date,time:ftime,mode:mode,location:loc,link:link,posted_by:userdetail.email,status:"approved",approved_by:"admin"}
        const ev=await new Event(data)
        await ev.save()
        eventnotification(data)
        res.status(201).json({status:201,msg:"Event Scheduled Successfully"})
        }else{
            const data={title:title,description:desc,
                date:date,time:ftime,mode:mode,location:loc,link:link,posted_by:userdetail.email,status:"pending"}
        const ev=await new Event(data)
        await ev.save()
        eventpermissionnotification(data)
        res.status(200).json({status:200,msg:"Event Scheduled Wait for Approval"})  
        }


    }catch(err){
        res.status(500).json({status:500,msg:err.message})
    }
}

const getevent=async(req,res)=>{
    try{
        const email=req.body.email
        const event=await Event.find({posted_by:email})
        res.status(200).json({status:200,data:event}) 
    }catch(err){
        res.status(500).json({status:500,msg:err.message})
    }
}

const getevents=async(req,res)=>{
    try{
        const event=await Event.find({})
        res.status(200).json({status:200,data:event}) 
    }catch(err){
        res.status(500).json({status:500,msg:err.message})
    }
}

const updateevent=async(req,res)=>{
    try{
        const id=req.body.eventid
        const msg=req.body.remark
        const sts=req.body.status
        const email=req.body.email
        const approver=req.body.approver
        const eventid=new ObjectId(id)
        const event=await Event.updateOne({_id:eventid},{$set:{status:sts,approved_by:approver,remarks:msg}})
        if(event.modifiedCount){
            if(sts.toLowerCase()=="approved"){
                const data=await Event.findOne({_id:eventid})
                eventnotification(data)
            }
            res.status(201).json({status:201,msg:"event updated"})
            notifyposteduser(sts,email,msg,id)
        }else{
            res.status(200).json({status:200,msg:"No changes Made"})
        }
    }catch(err){
        res.status(500).json({status:500,msg:err.message})
    }
}

const deleteevent=async(req,res)=>{
    try {
        const eventid=req.body.eventid
        const id=new ObjectId(eventid)
        const del=await Event.deleteOne({_id:id})
        if(del.deletedCount){
            res.status(201).json({status:201,msg:"Event Deleted"})
        }else{
            res.status(200).json({status:200,msg:"No Match Found"})
        }
    }catch(err){
        res.status(500).json({status:500,msg:err.message})
    }
}
module.exports={scheduleevent,getevent,getevents,updateevent,deleteevent}