const mongoose=require("mongoose")

const adminschema=new mongoose.Schema({
    name:{},
    email:{}
})

const Admin=mongoose.model("admin",adminschema)

module.exports=Admin