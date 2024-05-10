const Quiz=require("../models/quizschema")
const User = require("./dbschema");
const { v4: uuid } = require("uuid");
const { ObjectId } = require("mongodb");
const {sendquiznotification}=require("./Notification")
const addquiz=async(req,res)=>{
    const quizid=uuid()+new Date().getTime()
    const scheduled=req.body.scheduled
    const quizquestions=req.body.questions
    const options=req.body.options
    const quizanswers=req.body.quizanswers
    const apttopic=req.body.aptitudetopic
    const sol=req.body.solution
    try{
    const newquiz = await new Quiz({
       quizid:quizid,Scheduled_on:scheduled,topic:apttopic,questions:quizquestions,options:options,answers:quizanswers,solution:sol
    });
    const addquiz = await newquiz.save()
    sendquiznotification(apttopic,quizquestions,scheduled)
    res.status(201).json({ status: 201, msg: "Quiz Added" });
    }catch(err){
        res.status(500).json({status:500,msg:err.message})
    }

}
const getquiz=async(req,res)=>{
    try{
      const quiz = await Quiz.find();
      res.status(200).json({data:quiz});
    }catch(err){
        res.status(500).json({status:500,msg:err.message})
    }
}

const submitquiz=async(req,res)=>{
    try{    
        const id = new ObjectId(req.body.userid)
        const quizid=req.body.quizid
        const correct=req.body.correctans
        const wrongans=req.body.wrongans
        const date=req.body.submitteddate
        const etime=req.body.time
        const totalquest=req.body.totalquestions
        const title=req.body.topic

        const checksub=await User.findOne({$and:[{_id:id},{"quizzes.quizid":quizid}]})

        if(checksub){
            res.status(200).json({status:200,msg:"Test already Submitted"})
        }else{
        const sub=await User.updateOne({ _id: id },{
            $push:{quizzes:{topic:title,quizid:quizid,totalquestion:totalquest,correct_ans:correct,wrong_ans:wrongans,submitted_on:date,time:etime}},
            $inc:{ 
            "scoreboard.points":correct,
            "scoreboard.totalquestions":totalquest,
            "scoreboard.wrongans":wrongans.length,
            "scoreboard.correctans":correct
            }
        } )
        // await User.updateOne({_id:id},{$inc:{points:correct}})
        if(sub.modifiedCount){
            res.status(201).json({status:201,msg:"Test submitted"})
        }else{
            res.status(200).json({status:200,msg:"Test submission failure"})
        }
    }
    }catch(err){
        res.status(500).json({status:500,msg:err.message})
    }

}

const getsubmittedquiz=async(req,res)=>{
    try{
    const id = new ObjectId(req.query.userid)
    const quiz = await User.find({_id:id},{ quizzes:1,scoreboard:1});
    res.status(200).json({data:quiz});
    }catch(err){
    res.status(500).json({status:500,msg:err.message})
    }
}
const getleaderboard=async(req,res)=>{
    try{
        const rank=await User.find({},{name:1,scoreboard:1})
        res.status(200).json({status:200,data:rank})
    }catch(err){
    res.status(500).json({status:500,msg:err.message}) 
    }
}
module.exports ={addquiz,getquiz,submitquiz,getsubmittedquiz,getleaderboard}