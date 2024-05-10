const mongoose=require("mongoose")

const userschema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        
    },
    department:{

    },
    year:{
        
    },
    dob:{
        type:String
    },
    mobile:{
        type:Number
    } ,
    profilepic:{

    },
    area_of_interest:{
        type:String
    },
    profession:{

    },domain:{

    },skills:{},
    company:{},
    quizzes:[],
    scoreboard:{
        points:{
            type:Number,
            default:0
        },
        totalquestions:{
            type:Number,
            default:0
        },
        wrongans:{
            type:Number,
            default:0
        },
        correctans:{
            type:Number,
            default:0
        },
    },
    lastseen:{
    type:String,
    default:new Date().toString()}


})

const User=mongoose.model('userdata',userschema)

module.exports=User