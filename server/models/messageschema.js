const mongoose=require("mongoose")

const MessageSchema=new mongoose.Schema({
    userid:{

    },
    messages:[
        
    ]
})

const Message =mongoose.model("messages",MessageSchema)

module.exports=Message