const mongoose=require("mongoose")


const eventschema=new mongoose.Schema({
    title:{},
    description:{},
    date:{},
    time:{},
    mode:{},
    location:{},
    link:{},
    posted_by:{},
    status:{},
    approved_by:{},
    remarks:{}
})

const Event=mongoose.model("events",eventschema)
module.exports=Event