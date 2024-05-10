const mongoose=require("mongoose")

const ForumPosts=new mongoose.Schema({
    title:{},
    description:{},
    posted_user_id:{},
    posted_user_name:{},
    posted_date:{},

})
const ForumComments=new mongoose.Schema({
    post_id:{},
    comments:[]
})
const Posts=mongoose.model("forumposts",ForumPosts)
const Comments=mongoose.model("forumcomments",ForumComments)

module.exports={Posts,Comments}