const express=require('express')
const routerlink=require("./Routes/routes")
const app=express()
const http=require("http")
const server=http.createServer(app)
const cors=require("cors")
const dotenv=require('dotenv')
dotenv.config()
const connect=require("./Database/ConnectDB")
const multer=require("multer")
const {logEvents,errorhandler }=require("./middleware/logEvents")
const { sendmsgnotification } = require('./models/Notification')
const moment=require("moment-timezone")
const { setlastseen } = require('./models/apifunction')
const io=require("socket.io")(server,{
    cors:{origin:["http://localhost:3000","https://chat-frontend-blush.vercel.app"],methods:['*'],allowedHeaders:['*'] }
})

const port=process.env.PORT || 3000
connect()


app.use(express.urlencoded({extended:true}))

app.use(cors({origin:["http://localhost:3000","https://chat-frontend-blush.vercel.app"],methods:['*'],allowedHeaders:['*']}))


app.use((req,res,next)=>{
    logEvents(`${req.method} ${req.headers.origin} ${req.path}`,'logs.txt')
    next()
})
app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).send("<h1>Server Running</h1>")
})
app.use("/api",routerlink)
app.use("/uploads",express.static("./uploads"))


app.use((err,req,res)=>errorhandler(err,req,res))
const onlineusers={}
const lastseen={}
io.on('connection',(socket)=>{
    socket.on("error",(error)=>{
        console.log(error)
    })
    socket.on("setup",(userdata)=>{
        if(!onlineusers[userdata]){
            onlineusers[userdata]=socket.id
            socket.join(userdata) 
            console.log("joined id : "+userdata + " socket id : "+ onlineusers[userdata])
           
        }  
        // socket.emit("get onlineusers",onlineusers)
    })
    setInterval(() => {
        io.emit("get onlineusers", onlineusers) 
        io.emit("get lastseenusers",lastseen)
    }, 1000);
    socket.on("disconnect",()=>{
        const timenow = moment().tz("Asia/Kolkata").format("LLLL");
         const user=Object.keys(onlineusers).find(key=>onlineusers[key]===socket.id)
         if(user){
             lastseen[user]=timenow
             delete onlineusers[user]
             setlastseen(user,timenow)
            console.log("USER disconnected "+ user)
     }
    })
    socket.on("chat",(room)=>{
    //     socket.join(room)
       // console.log("joined "+room)
    })
 
   
   
    socket.on("chat message",(data)=>{
      
        //console.log("hello")
        const user=onlineusers[data.receiverid]
        if(user){
        const received={sender:data.senderid,msg:data.msg,msgid:"",date:data.date,time:data.time,type:"received"}
             io.to(data.receiverid).emit("received message",received)
            console.log("message sent to",data.receiverid)
        
        }else{
            console.log("user not online")
            sendmsgnotification(data)
        }
       
        
    })

})

server.listen(port,()=>{
    console.log(`Server Running in port ${port}`)
})
