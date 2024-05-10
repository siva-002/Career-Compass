const { ObjectId } = require("mongodb");
const {Posts,Comments}=require("./Forumschema");
const User = require("./dbschema");
const { v4: uuid } = require("uuid");
const { discussionpostnotification, discussionreplynotification } = require("./Notification");

const addpost=async(req,res)=>{
    try{
        const title=req.body.title
        const desc=req.body.description
        const date=req.body.date
        const id=req.body.userid
        const userid=new ObjectId(id)
        const user=await User.findOne({_id:userid})
    

        const username=user.name
        const post=await new Posts({title:title,description:desc,
            posted_user_id:userid,
            posted_user_name:username,
            posted_date:date
        })
        const postadd=await post.save()      
        discussionpostnotification(title,desc,date,username,userid)     
        res.status(201).json({status:201,msg:"Post Added Successfully"})

        
    }catch(err){
        res.status(500).json({status:500,msg:err.message})
    }
}

const getposts=async(req,res)=>{
    try{
        const posts=await Posts.find({})
        res.status(200).json({status:200,data:posts})
    }catch(err){
        res.status(500).json({status:500,msg:err.message})
    }
}

const postreply=async(req,res)=>{
    try{
        const id=req.body.postid
        const replyuser=req.body.userid
        const reply=req.body.reply
        const date=req.body.date
        const findreplyname=await User.findOne({_id:new ObjectId(replyuser)})
        
        const post=await Posts.findOne({_id:new ObjectId(id)})
        
        const findpostcomment=await Comments.findOne({post_id:new ObjectId(id)})
        if(findpostcomment){
            const pcomment=await Comments.updateOne({post_id:new ObjectId(id)},{$push:{comments:{
                cid:uuid(),user_id:new ObjectId(findreplyname._id),user_name:findreplyname.name,text:reply,date:date
            }}})
            res.status(200).json({status:200,msg:"Comment Added"})
        }else{
            const pcomment=await new Comments({post_id:new ObjectId(id),comments:[
               { cid:uuid(),user_id:new ObjectId(findreplyname._id),user_name:findreplyname.name,text:reply,date:date}
        ]})
            await pcomment.save()
            res.status(200).json({status:200,msg:"Comment Added"})
        }
        discussionreplynotification(post.title,replyuser,findreplyname.name,reply,date)

    }catch(err){
        res.status(500).json({status:500,msg:err.message})
    }
}

const getcomments=async(req,res)=>{
    try{
        const id=req.body.postid
        const findpostcomment=await Comments.findOne({post_id:new ObjectId(id)})
        res.status(200).json({status:200,data:findpostcomment})

    }catch(err){
        res.status(500).json({status:500,msg:err.message})
    }
}

const getuserposts=async(req,res)=>{
    try{
        const id=req.body.userid
        const findposts=await Posts.find({posted_user_id:new ObjectId(id)})
        res.status(200).json({status:200,data:findposts})

    }catch(err){
        res.status(500).json({status:500,msg:err.message})
    }
}

const editpost=async(req,res)=>{
    try{
        const id=req.body.postid
        const title=req.body.title
        const desc=req.body.description
        const date=req.body.date

        const uppost=await Posts.updateOne({_id:new ObjectId(id)},{$set:{
            title:title,description:desc,
            posted_date:date
        }})
        if(uppost.modifiedCount){
            res.status(201).json({ status: 201, msg: "Updated Successfully" });
        }else{
            res.status(200).json({ status: 200, msg: "Something Went Wrong" });
        }
    }catch(err){
        res.status(500).json({status:500,msg:err.message})
    }
}

const deletepost=async(req,res)=>{
    try{
        const id=req.body.postid
        const dlpost=await Posts.deleteOne({_id:new ObjectId(id)})
       
        if(dlpost.deletedCount){
            const dlcomnt=await Comments.deleteOne({post_id:new ObjectId(id)})
            res.status(201).json({status:201,msg:"Post Deleted"})
        }else{
            res.status(200).json({status:200,msg:"Something Went Wrong"})
        }

    }catch(err){
     res.status(500).json({status:500,msg:err.message})
    }
}

const getreplies=async(req,res)=>{
    try{
        const id=req.body.postid
        const postcomments=await Comments.findOne({post_id:new ObjectId(id)})
        res.status(200).json({status:200,data:postcomments})
    }catch(err){
    res.status(500).json({status:500,msg:err.message})
    }
}

const getmyreplies=async(req,res)=>{
    try{
        const id=req.body.userid
        const postcomments=await Comments.find({"comments.user_id":new ObjectId(id)})
        res.status(200).json({status:200,data:postcomments})
    }catch(err){
        res.status(500).json({status:500,msg:err.message}) 
    }
}


const updatemyreply=async(req,res)=>{
    try{
        const cmntid=req.body.commentid
        const postid=req.body.pid
        const text=req.body.text
        const date=req.body.date

       const up= await Comments.updateOne(
        {
            $and:[
                {post_id:new ObjectId(postid)},
                {"comments.cid":cmntid}
            ]
        },
        {$set:{"comments.$.text":text,"comments.$.date":date}}
       )
       if(up.modifiedCount){
        res.status(201).json({ status: 201, msg: "Updated Successfully" });
        }
        else{
        res.status(200).json({ status: 404, msg: "Something Went Wrong" });
         }
    }catch(err){
       
         res.status(500).json({status:500,msg:err.message}) 
    }
}

const deletemyreply=async(req,res)=>{
    const commentid=req.body.commentid
    const postid=req.body.postid

    const deletecmnt=await Comments.updateOne(     
        { post_id: new ObjectId(postid), "comments.cid": commentid },
        { $pull: { "comments": { cid: commentid } } 
    })

    if(deletecmnt.modifiedCount){
        res.status(201).json({ status: 201, msg: "Deleted Successfully" });
    }
    else{
    res.status(200).json({ status: 404, msg: "Something Went Wrong" });
     }
}
module.exports={
    addpost,getposts,postreply,getcomments,getuserposts,editpost,deletepost,getreplies,getmyreplies,
    updatemyreply,deletemyreply
}