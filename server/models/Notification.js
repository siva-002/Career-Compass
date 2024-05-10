const { decryptdata } = require("./EncryptionandDecryption");
const Admin = require("./adminschema");
const User = require("./dbschema");
const Event=require("./eventschema")
const transporter=require("./nodemailer")
const { ObjectId } = require("mongodb");

const sendquiznotification =async(topic,question,date)=>{
    const users=await User.find({},{email:1,name:1})
    users.map((ele,index)=>{
    const options={
        from:"Career Compass <chat.no.reply.recovery@gmail.com>",
        to:ele.email,
        subject:"New Quiz Scheduled",
        html:`<body style="font-family: Arial, sans-serif;">
        <p>Dear ${ele.name},</p>

        <p>We are excited to announce that a new quiz has been scheduled. You can attend this quiz at any time that is convenient for you.</p>
        <hr/>
        <h3>Quiz Details:</h3>
        <ul>
        <li><strong>Topic:</strong> ${topic}</li>
        <li><strong>Total Questions:</strong> ${Object.keys(question).length}</li>
        <li><strong>Updated on:</strong> ${date.substr(0,10)}</li>   
         </ul>
        <hr/>
        <p>This quiz is a great opportunity to test your knowledge and improve your skills. Don't miss out!</p> 
        <p>Log in to your account on CareerCompass to access the quiz and participate.</p>
        <p>If you have any questions or need assistance, feel free to reach out to us.</p>
    
        <p>Best regards,</p>
        <p>Sincerely,</p>  
        <p>Career Compass Team</p>
    </body>`
      }
      transporter.sendMail(options)
    })


}

const sendmsgnotification =async(data)=>{
    const senderid=new ObjectId(data.senderid)
    const receiverid=new ObjectId(data.receiverid)

    const senderdetails=await User.findOne({_id:senderid},{name:1,email:1})
    const receiverdetails=await User.findOne({_id:receiverid},{name:1,email:1})
    const options={
        from:"Career Compass <chat.no.reply.recovery@gmail.com>",
        to:receiverdetails.email,
        subject:"New Message Received",
        html:`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">    
             <style>
                ul{
                    list-style-type:none;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 10px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                }
                ul li{
                    margin-top:10px;
                }
                </style>
        </head>
        <body style="font-family: Arial, sans-serif;">
        <p>Dear ${receiverdetails.name},</p>
        <p>You have received a new message from a user</p>    
        <h3>Message Details:</h3>    
        <ul style="box-shadow:0px 0px 5px grey;padding:10px;">
            <li><strong>Sender Name: </strong> ${senderdetails.name}</li>
            <li><strong>Sender Email: </strong> ${senderdetails.email}</li>
            <li><strong>Message: </strong>${decryptdata(data.msg)}</li>
            <li><strong>Sent on: </strong>${data.time}</li>            
        </ul>
        <p>To reply to the message, please log in to your Career Compass account.</p>
        <p>Please respond to this message as soon as possible.</p>
        <p>Thank you!</p>
        <p>Best regards,</p>
        <p>Sincerely,</p>  
        <p>Career Compass Team</p>
    </body>
    </html>
    `
      }
      transporter.sendMail(options)
    
}


const eventnotification=async(evdetails)=>{
    const users=await User.find({},{email:1,name:1})
    users.map((ele,index)=>{
    const options={
        from:"Career Compass <chat.no.reply.recovery@gmail.com>",
        to:ele.email,
        subject:"New Event Scheduled",
        html:`  <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">    
             <style>
                ul{
                    list-style-type:none;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 10px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                }
                ul li{
                    margin-top:10px;
                }
                </style>
        </head>
        <body style="font-family: Arial, sans-serif;">
        <p>Dear ${ele.name.toUpperCase()},</p>
        <p>We are excited to inform you about a new event. Below are the details:</p>
       <h3>Event Details:</h3>    
        <ul style="box-shadow:0px 0px 5px grey;padding:10px;">
                <li><strong>Title :</strong> ${evdetails.title}</li>
                <li><strong>Description:</strong> ${evdetails.description}</li>    
                <li><strong>Mode :</strong> ${evdetails.mode}</li>
                <li><strong>Date :</strong> ${evdetails.date}</li>
                <li><strong>Time :</strong> ${evdetails.time}</li>
                ${evdetails.mode=="Online"?
                `<li><strong>Meet Link:</strong> ${evdetails.link}</li>`
                :
                `<li><strong>Location:</strong> ${evdetails.location}</li>`
                }
                 
        </ul>
        <p>If you have any questions or need further information, feel free to contact us.</p>  
        <p>Thank you!</p>
        <p>Best regards,</p>
        <p>Sincerely,</p>  
        <p>Career Compass Team</p>
    </body>
    </html>
        `
      }
      transporter.sendMail(options)
    }) 
}

const eventpermissionnotification=async(evdetails)=>{
    const admins=await Admin.find({},{email:1,name:1})
    admins.map((ele,index)=>{
    const options={
        from:"Career Compass <chat.no.reply.recovery@gmail.com>",
        to:ele.email,
        subject:"New Event Approval Notification",
        html:`  <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">    
             <style>
                ul{
                    list-style-type:none;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 10px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                }
                ul li{
                    margin-top:10px;
                }
              
                </style>
        </head>
        <body style="font-family: Arial, sans-serif;">
        <p>Hello ${ele.name.toUpperCase()},</p>
        <p>A new event has been scheduled and requires your attention for approval or rejection.</p>
        <h3>Event Details:</h3>    
        <ul style="box-shadow:0px 0px 5px grey;padding:10px;">
                <li><strong>Title :</strong> ${evdetails.title}</li>
                <li><strong>Description:</strong> ${evdetails.description}</li>    
                <li><strong>Mode :</strong> ${evdetails.mode}</li>
                <li><strong>Date :</strong> ${evdetails.date}</li>
                <li><strong>Time :</strong> ${evdetails.time}</li>
                ${evdetails.mode=="Online"?
                `<li><strong>Meet Link:</strong> ${evdetails.link}</li>`
                :
                `<li><strong>Location:</strong> ${evdetails.location}</li>`
                }
                 
        </ul>
        <p>Please take the necessary action as soon as possible:</p>
       <p>Thank you!</p>
        <p>Best regards,</p>
        <p>Sincerely,</p>  
        <p>Career Compass Team</p>
    </body>
    </html>
        `
      }
      transporter.sendMail(options)
    }) 
}
const notifyposteduser=async(action,email,msg,id)=>{
    const user=await User.findOne({email:email},{email:1,name:1})
    const evid=new ObjectId(id)
    const evdetails=await Event.findOne({_id:evid})
    const options={
        from:"Career Compass <chat.no.reply.recovery@gmail.com>",
        to:user.email,
        subject:`Event ${action.toUpperCase()} Notification`,
        html:`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">    
             <style>
                ul{
                    list-style-type:none;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 10px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                }
                ul li{
                    margin-top:10px;
                }
                .reject{
                    color:red;
                }
                .approve{
                    color:green;
                }
                </style>
        </head>
        <body style="font-family: Arial, sans-serif;">
        <p>Hello ${user.name},</p>
        <p>We would like to inform you that the admin has taken action regarding your scheduled event.</p>
        <h3>Event Details:</h3>    
        <ul >
                <li><strong>Title :</strong> ${evdetails.title}</li>
                <li><strong>Description:</strong> ${evdetails.description}</li>    
                <li><strong>Mode :</strong> ${evdetails.mode}</li>
                <li><strong>Date :</strong> ${evdetails.date}</li>
                <li><strong>Time :</strong> ${evdetails.time}</li>
                ${evdetails.mode=="Online"?
                `<li><strong>Meet Link:</strong> ${evdetails.link}</li>`
                :
                `<li><strong>Location:</strong> ${evdetails.location}</li>`
                }
                 
        </ul>
        <p>The admin has <b class="${action?.toLowerCase() == 'rejected' ? 'reject' : 'approve'}">${action.toUpperCase()}</b> your event.</p>

          ${action?.toLowerCase()=="rejected"?
        `<p><b>${msg}</b></p>`:""
        }
    
        <p>If you have any questions or need further assistance, feel free to reach out to us.</p>
   
        <p>Thank you!</p>
        <p>Best regards,</p>
        <p>Sincerely,</p>  
        <p>Career Compass Team</p>
    </body>
    </html>
    `
      }
      transporter.sendMail(options)

}

const discussionpostnotification=async(title,desc,date,username,userid)=>{
    const users=await User.find({ _id: { $ne:userid } },{email:1,name:1})
    users.map((ele,index)=>{
    const options={
        from:"Career Compass <chat.no.reply.recovery@gmail.com>",
        to:ele.email,
        subject:"New Discussion Started",
        html:`  <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">    
             <style>
                ul{
                    list-style-type:none;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 10px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                }
                ul li{
                    margin-top:10px;
                }
                </style>
        </head>
        <body style="font-family: Arial, sans-serif;">
        <p>Dear ${ele.name.toUpperCase()},</p>
        <p>A new discussion has been posted on our platform. Please review the details below:</p>
       <h3>Discussion Details:</h3>    
        <ul style="box-shadow:0px 0px 5px grey;padding:10px;">
                <li><strong>Title :</strong> ${title}</li>
                <li><strong>Description:</strong> ${desc}</li>    
                <li><strong>User Name:</strong> ${username}</li>    
                <li><strong>Posted on :</strong> ${new Date(date).toLocaleDateString()} ${new Date(date).toLocaleTimeString()}</li>     
        </ul>
        <p>If you have knowledge or insights to share, feel free to join the discussion!</p>
        <p>Thank you!</p>
        <p>Best regards,</p>
        <p>Sincerely,</p>  
        <p>Career Compass Team</p>
    </body>
    </html>
        `
      }
      transporter.sendMail(options)
    }) 
}

const discussionreplynotification=async(title,recid,repliername,reply,date)=>{
    const receiverid=new ObjectId(recid)
    const receiverdetails=await User.findOne({_id:receiverid},{name:1,email:1})
    const options={
        from:"Career Compass <chat.no.reply.recovery@gmail.com>",
        to:receiverdetails.email,
        subject:"New Reply to Your Discussion",
        html:`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">    
             <style>
                ul{
                    list-style-type:none;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 10px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                }
                ul li{
                    margin-top:10px;
                }
                </style>
        </head>
        <body style="font-family: Arial, sans-serif;">
        <p>Dear ${receiverdetails.name},</p>
        <p>Your discussion on our platform has received a new reply. Here are the details</p>    
        <ul style="box-shadow:0px 0px 5px grey;padding:10px;">
            <li><strong>Discussion Title: </strong> ${title}</li>
            <li><strong>Replied By: </strong> ${repliername}</li>
            <li><strong>Date of Reply: </strong>${new Date(date).toLocaleDateString()} ${new Date(date).toLocaleTimeString()}</li>       
        </ul>
        <h3>Reply Summary:</h3>
        <p><b>${reply}</b></p>
        <p>You can also view the reply by visiting the questions section on our platform</p>
        <p>Thank you for contributing to our community!</p>
        <p>Best regards,</p>
        <p>Sincerely,</p>  
        <p>Career Compass Team</p>
    </body>
    </html>
    `
      }
      transporter.sendMail(options)
    
}
module.exports={sendquiznotification,sendmsgnotification,
    eventnotification,eventpermissionnotification,notifyposteduser,discussionpostnotification,
    discussionreplynotification
}