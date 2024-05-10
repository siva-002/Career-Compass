const mongoose=require("mongoose")
const connect=()=>{
    const uri = "mongodb+srv://ADMIN:fFXIqNKv1eVjnWKk@cluster0.vspjqox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    try{
        mongoose.connect(uri).then(()=>{
            console.log("DB connected")
        })
        
    }catch(error){
        console.error(`Error in Db connection ${err}`)
    }
}

module.exports=connect