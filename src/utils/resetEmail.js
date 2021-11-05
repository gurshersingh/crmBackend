const nodemailer = require("nodemailer");
const { resolveContent } = require("nodemailer/lib/shared");
const sendResetPin = (emailObj)=>{
const {email,pin,type}=emailObj
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'boyd.brekke63@ethereal.email',
        pass: 'BnAa95Z7TYc6KhDust'
    }
});
const sendPin = (email,pin) =>{

    return new Promise(async(resolve, reject)=>{
        try {
           
            let info = await transporter.sendMail({
                from: '"Gursher" <boyd.brekke63@ethereal.email>', // sender address
                to: email, // list of receivers
                subject: "SinghSoftware Reset pin ", // Subject line
                text: "Your reset pin is "+pin, // plain text body
                html: `<b>Your reset pin is ${pin}</b>`, // html body
              })
              console.log("Message sent: %s", info.messageId);
            //  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        resolve(info)
        } catch (error) {
            console.log(error())
        }
        
    })
    
}

const sendEmail = (email) =>{
    return new Promise (async (resolve,reject)=>{
        console.log(email,pin)
        try {
            let info = await transporter.sendMail({
                from: '"Gursher" <boyd.brekke63@ethereal.email>', // sender address
                to: email, // list of receivers
                subject: "SinghSoftware password has been reset ", // Subject line
                text: "You have successfully updated your password for singhsoftwares", // plain text body
                html: `<b>You have successfully updated your password for singhsoftwares</b>`, // html body
              })
              console.log("Message sent: %s", info.messageId);
              resolve(info)
            }
         catch (error) {
            console.log(error)
        }
    })
}
    switch (type) {
        case 'reset-email':
            return sendPin(email,pin)
            break;
        case 'send-email':
            return sendEmail(email)
            break;
    
        default:
            break;
    }
    
}
module.exports={
    sendResetPin
}