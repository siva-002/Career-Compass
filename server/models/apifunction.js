const User = require("./dbschema");
const Message=require("./messageschema")
const { generatetoken, validatetoken } = require("./tokenfunction");
const { generatehash, checkpassword } = require("./Hashpassword");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const { encryptdata, decryptdata } = require("./EncryptionandDecryption");
const { ObjectId } = require("mongodb");
const { isObjectIdOrHexString } = require("mongoose");
const fs = require("fs");
const fspromises = require("fs/promises");
const path = require("path");
const transporter=require("./nodemailer")
const moment=require("moment-timezone")
const Admin=require("./adminschema")
const userExists = async (em) => {
  try {
    const user = await User.findOne({ email: em });
    return user;
  } catch (err) {
    console.error(err);
  }
};

const getAdminlist=async(req,res)=>{
  try{
  
    const admin=await Admin.find()
    res.status(200).json({data:admin})
  }catch(err){
    console.log(err.message)
  }
}
const registeruser = async (req, res) => {
  const hashedpwd = await generatehash(req.body.password);
  try {
    if (!(await userExists(req.body.email))) {
      const newuser = await new User({
        name: req.body.username,
        email: req.body.email,
        password: hashedpwd,
      });
      const reguser = await newuser.save();
      res.status(201).json({ status: 201, msg: "Registration Success" });
    } else {
      res.status(200).json({ status: 200, msg: "Email already Registered" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const loginuser = async (req, res) => {
  try {
    const user = await userExists(req.body.email);

    if (user) {
      const check = await checkpassword(req.body.password, user.password);
      if (check) {
        const token = await generatetoken(check.email);
        res.status(200).json({ status: 200, token: token, userid: user._id });
      } else {
        res.status(401).json({ status: 401, msg: "Invalid Password" });
      }
    } else {
      res.status(404).json({ status: 404, msg: "Invalid Email" });
    }
  } catch (err) {
    res.status(500).json({ status: "Server Error", msg: err.message });
  }
};
const resetpassword=async(req,res)=>{
  const id = new ObjectId(req.body.id)
  const hashedpwd = await generatehash(req.body.password)
  try{
    const user=await User.updateOne({_id:id},{$set:{password:hashedpwd}})
    const find=await User.findOne({_id:id},{name:1,email:1})
    const options={
      from:"Career Compass <chat.no.reply.recovery@gmail.com>",
      to:find.email,
      subject:"Password Reset Successful",
      html:`<body style="font-family: Arial, sans-serif;">
      <p>Dear ${find.name},</p>
      <p>Your password has been successfully reset for Career Compass Acoount. You can now log in using your new password.</p>
      <p>If you have any further questions or concerns, please feel free to contact us.</p>  
      <p>Thank you for using Career Compass!</p>  
      <p>Sincerely,</p>  
      <p>Career Compass Team</p>
  </body>`
    }
    user.modifiedCount?(
    res.status(200).json({"msg":"Password Reset Successfully"}),
    transporter.sendMail(options)
    )
    
    :
    res.status(200).json({"msg":"Password Reset Failured"})
  }catch(err){
    console.log(err.message)
  }
}
const forgotpassword=async(req,res)=>{
  const email=req.body.email
  const user=await User.findOne({email:email},{_id:1,name:1})
  if(user){
    let otp=""
    for(i=0;i<5;i++){
      otp=otp+Math.floor(Math.random()*5).toString()
    }
  const options={
    from:"Career Compass <chat.no.reply.recovery@gmail.com>",
    to:email,
    subject:"Password Reset OTP Request",
    html:`<body style="font-family: Arial, sans-serif;">
    <p>Dear ${user.name},</p>
    <p>You have requested to reset your password for Career Compass Account. To proceed with the password reset, please use the following One-Time Password (OTP):</p>
   <p style="font-weight: bold; font-size: 18px;">OTP: ${otp}</p>
    <p>Thank you,</p>
    <p>Career Compass Team</p>
</body>`
  }
  transporter.sendMail(options,(err,info)=>{
    err
    ?res.status(500).json({"status":500,"msg":`error in sending mail Try again later`})
    : res.status(200).json({"status":200,"msg":"otp has been sent to user","data":{"id":user._id,"otp":otp}})

  })
   }else{
    res.status(404).json({"status":404,"msg":"The entered email is not registered"})
  }
}
const getuser = async (req, res) => {
  try {
    const id = new ObjectId(req.body.user_id);
    const user = await User.findOne(
      { _id: id },
      { name: 1, email: 1, mobile: 1, dob: 1,profilepic:1,department:1,year:1,area_of_interest:1,profession:1,domain:1,skills:1 }
    );
    res.status(200).json({data: user });
  } catch (err) {
    res.status(500).json({ status: 500, msg: err.message });
  }
};
const getnewmessages=(async(req,res)=>{
    try{
      const id = new ObjectId(req.body.id);
      const user = await User.findOne(
        { _id: id },
        { newmessages:1}
      );
      res.status(200).json({data: user });
    }catch(err){
      console.log(err.message)
    }
})
const getusers = async (req, res) => {
  try {
    const user = await User.find({}, { name: 1, _id: 1 ,email:1,mobile:1,profilepic:1,area_of_interest:1,lastseen:1,profession:1,domain:1,skills:1,company:1});
    res.status(200).json({ data: user });
  } catch (err) {
    res.status(500).json({ status: 500, msg: err.message });
  }
};
const updateuser = async (req, res) => {
  try {
    // const {_id,name,email,dob,mobile}=req.body
 
    const file = req.body["file"];
    console.log(file)
    const _id = req.body["_id"];
    const name = req.body["name"];
    const email = req.body["email"];
    const dob = req.body["dob"];
    const mobile = req.body["mobile"];
    const dept=req.body["department"]
    const year=req.body["year"]
    const pro=req.body["profession"]
    const dom=req.body["domain"]
    const areaofinterest=req.body["area_of_interest"]
    const uid = new ObjectId(_id);
    const skills=req.body["skills"]
    const company=req.body["company"]
   
    const checkemail = await User.find({
      email: email,
      _id: { $ne: uid },
    }).count();
    if (!checkemail) {
      const out = file.includes("data")?await User.updateOne({ _id: uid },{$set: {name: name,email: email,dob: dob,mobile: mobile,
            department:dept,year:year,profilepic: file,area_of_interest:areaofinterest,domain:dom,profession:pro,skills:skills,company:company}}):
            await User.updateOne({ _id: uid },{$set: {name: name,email: email,dob: dob,mobile: mobile, department:dept,year:year,area_of_interest:areaofinterest,domain:dom,profession:pro,skills:skills,company:company}})
      if (out.modifiedCount) {
        res.status(201).json({ status: 201, msg: "Updated Successfully" });
      } else if (out.matchedCount) {
        res.status(200).json({ status: 200, msg: "No Changes have been made" });
      } else {
        res.status(500).json({ status: 500, msg: "Error in Updation" });
      }
    } else {
      res.status(200).json({ status: 200, msg: "Email Already Exists" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, msg: err.message });
  }
};

const newmessagecount=async(sendid,recid)=>{
    try{
 
    const recuser=await User.findOne({$and:[{_id:recid},{"newmessages.sender_id":sendid }]}) 

    if(recuser){
      // console.log("first runs")
      await User.updateOne({$and:[{_id:recid},{"newmessages.sender_id":sendid }]},{$inc:{"newmessages.$.count":1}} )
    }else{
      //  console.log("second runs")
      await User.updateOne({_id:recid},{$push:{newmessages:{sender_id:sendid,count:1}}})
    }

    }catch(err){
      console.log(err.message)
    }
}
const setlastseen=async(id,time)=>{
  try{
    const userid=new ObjectId(id)
    const setlast=await User.updateOne({_id:userid},{$set:{lastseen:time}})
    console.log("lastseen updated")
  }catch(err){
    console.log(err.message)
  }
}
const removenewmsgcount=async(req,res)=>{
  try{ 
    const sendid = new ObjectId(req.body.sendid);
    const recid = new ObjectId(req.body.recid);
   const recuser=await User.findOne({$and:[{_id:recid},{"newmessages.sender_id":sendid }]}) 
   console.log("count removed")
  if(recuser){
    await User.updateOne({$and:[{_id:recid},{"newmessages.sender_id":sendid }]},{$set:{"newmessages.$.count":0}} )
  }}catch(err){
    console.log(err.message)
  }
}
const sentmessage = async (req, res) => {
  try {
  
    const sender = new ObjectId(req.body.senderid);
    const receiver = new ObjectId(req.body.receiverid);
    const message = encryptdata(req.body.message);

    const timenow = moment().tz("Asia/Kolkata").format("LLLL");
    const uid = uuid();
    let datas = " ";

    const finduser = await Message.findOne({
      $and: [{ userid: sender }, { "messages.receiverid": receiver }],
    });
   
    const usermsg=await Message.findOne({userid:sender})
    if(!usermsg){
      datas=await new Message(
        { userid: sender,
            messages: [{
              receiverid: receiver,
              data: [{ msgid: uid, time: timenow, msg: message }],
            }],
        })        
        await datas.save()
     
    }else{
    if (finduser) {
      datas = await Message.updateOne({ $and: [{ userid: sender }, { "messages.receiverid": receiver }] },
        {
          $push: {
            "messages.$.data": { msgid: uid, time: timenow, msg: message },
          },
        })

    } else {
      datas = await Message.updateOne({ userid: sender },{$push: {
             messages: {
              receiverid: receiver,
              data: [{ msgid: uid, time: timenow, msg: message }],
            },
          },})

    }
  }
   // await newmessagecount(sender,receiver)

    if (datas._id || datas.modifiedCount) {
      res.status(200).json({ status: 200, msg: "Message Sent Successfully" ,});
    } else {
      res.status(500).json({ status: 500, msg: "Error in sending message" });
    }
  } catch (err) {
    console.log(err.message)
    res.send(err.message);
  }
};

const getreceivedmessage = async (req, res) => {
  try {
    const id = new ObjectId(req.body.id);
    const user = await Message.find(
      { "messages.receiverid": id },
      { "messages.$": 1 ,userid:1}
    );
    res.json({ data: user });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const getsentmessage = async (req, res) => {
  try {
    const id = new ObjectId(req.body.id);
    const user = await Message.find({ userid: id });
    res.json({ data: user });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const updateprofilepic = async (req, res) => {
  try {
    console.log("hello");
    const id = new Object(req.body.id);
    const file = req.body.file;
    console.log(file);
    console.log(id);
    // const updated= await User.updateOne({_id:id},{$set:{profilepic:file.originalname}})
    // if(updated.modifiedCount){
    //     res.status(201).json({"status":201,"msg":"Profile Pic Updated"})
    // }else{
    //     res.status(201).json({"status":200,"msg":"Error in updation"})
    // }
  } catch (err) {
    res.status(500).json({ status: 500, msg: err.message });
  }
};
module.exports = {
  registeruser,
  loginuser,
  getuser,
  getusers,
  sentmessage,
  getreceivedmessage,
  getsentmessage,
  updateuser,
  updateprofilepic,
  getnewmessages,
  removenewmsgcount,
  forgotpassword,
  resetpassword,
  setlastseen,
  getAdminlist
};
