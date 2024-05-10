const express=require("express")
const router=express.Router()
const { resetpassword,forgotpassword,removenewmsgcount,registeruser,loginuser,getuser,getusers,sentmessage,getreceivedmessage,getsentmessage,updateuser,getnewmessages, getAdminlist}=require("../models/apifunction")
const {validatetoken} =require("../models/tokenfunction")
const multer=require("multer")
const path=require("path")
const { addquiz,getquiz,submitquiz,getsubmittedquiz,getleaderboard } = require("../models/quizfunction")
const { scheduleevent, getevent, getevents, updateevent, deleteevent } = require("../models/eventfunction")
const { addpost, getposts, postreply, getcomments, getuserposts, editpost, deletepost, getreplies, getmyreplies, updatemyreply, deletemyreply } = require("../models/Forumfunction")

const storage=multer.diskStorage({
      destination:function async(req,file,cb){
            const loc=path.join(__dirname,'..','uploads')
             cb(null,loc)
      },
      filename:function(req,file,cb){
            cb(null,file.originalname)
      }
})
const upload=multer({storage:storage})
router.post("/",(req,res)=>{
      res.send("hello server working")
})
router.post("/login",(req,res)=>loginuser(req,res))
router.post("/register",(req,res)=>registeruser(req,res))
router.post("/forgotpassword",(req,res)=>forgotpassword(req,res))
router.post("/resetpassword",(req,res)=>resetpassword(req,res))

router.post("/User",validatetoken,(req,res)=>{
      res.json({status:"200",msg:"Authorized"})
})
router.post("/getuser",(req,res)=>getuser(req,res))
router.post("/getusers",(req,res)=>getusers(req,res))
router.post("/sendmessage",(req,res)=>sentmessage(req,res))
router.post("/getreceivedmessage",(req,res)=>getreceivedmessage(req,res))
router.post("/getsentmessage",(req,res)=>getsentmessage(req,res))
// router.post("/getnewmessages",(req,res)=>getnewmessages(req,res))
// router.post("/removenewmsgcount",(req,res)=> removenewmsgcount(req,res))
router.post("/updateuser",upload.single('file'),(req,res)=>updateuser(req,res))


//quiz
router.post("/addquiz",(req,res)=>addquiz(req,res))
router.get("/getquiz",(req,res)=>getquiz(req,res))
router.post("/submitquiz",(req,res)=>submitquiz(req,res))

router.get("/submittedquiz",(req,res)=>getsubmittedquiz(req,res))
router.get("/getleaderboard",(req,res)=>getleaderboard(req,res))
router.get("/getadmin",(req,res)=>getAdminlist(req,res))

router.post("/scheduleevent",(req,res)=>scheduleevent(req,res))
router.post("/getevent",(req,res)=>getevent(req,res))
router.get("/getevents",(req,res)=>getevents(req,res))

router.post("/updateevent",(req,res)=>updateevent(req,res))
router.post("/deleteevent",(req,res)=>deleteevent(req,res))

router.post("/addpost",(req,res)=>addpost(req,res))
router.get("/getposts",(req,res)=>getposts(req,res))
router.post("/replypost",(req,res)=>postreply(req,res))
router.post("/getcomments",(req,res)=>getcomments(req,res))
router.post("/getuserposts",(req,res)=>getuserposts(req,res))
router.post("/editpost",(req,res)=>editpost(req,res))
router.post("/deletepost",(req,res)=>deletepost(req,res))

router.post("/getreplies",(req,res)=>getreplies(req,res))
router.post("/getmyreplies",(req,res)=>getmyreplies(req,res))
router.post("/updatemyreply",(req,res)=>updatemyreply(req,res))
router.post("/deletemyreply",(req,res)=>deletemyreply(req,res))


module.exports=router
  