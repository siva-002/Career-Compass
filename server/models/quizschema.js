const mongoose=require("mongoose")

const quizschema=new mongoose.Schema({
    quizid:{
        type:String
    },
    Scheduled_on:{
        type:String
    },
    topic:{
        type:String
    },
    options:[],
    questions:[],
    answers:[],
    solution:[]
})


const Quiz=mongoose.model('quiz',quizschema)

module.exports=Quiz