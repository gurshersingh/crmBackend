const express = require("express");
const router = express.Router();
const {insertUser,findUserByEmail,findUserById,findEmailPassword } = require("../model/user/User.model")
const { hashPassword, coparePassword} = require("../helper/bcrypt")
const {createAccessJWT,createRefreshJWT,verifyAccessJWT} =require("../helper/jwt")
const {userAuthorization}=require("../middleware/authorization.middle")
const {getPin}= require("../helper/pinGenerator")
const {insertEmailPin,deleteUserByEmail,findByEmailPin} = require("../model/emailPin/EmailPin.model")
const {sendResetPin} = require("../utils/resetEmail")

router.post("/", async (req,res)=>{
    try {
        const hashedPassword = await (hashPassword(req.body.password))
        req.body.password=hashedPassword
         await insertUser(req.body).then((result)=>{
            console.log(result)
        res.json({message:"New user creater",result})
        })
        
    } catch (error) {
        res.json({status:"error",message:error.message})
        
    }
})

router.get("/login", userAuthorization,async(req,res) =>{
    try {
        const userProfile = await findUserById(req.id)
   
        res.json({user:userProfile})
    } catch (error) {
        res.status(404).json({message:"forbidden"})
    }
    
        
    
})
router.post("/login", async (req,res)=>{
    try {
        //const hashedPassword = await (hashPassword(req.body.password))
        //req.body.password=hashedPassword
        const {email,password}=req.body
        //console.log(email)
        if(!email||!password){
            return res.json({status:"error", message:"Email or Password missing"})
        }
        const user = await findUserByEmail(email)
          //console.log(user)
          if(!user){
              return res.json({status:"fail", message:"No User found"})
          }
          
                const dbPassword = user._id? user.password:null
                const result = await coparePassword(password,dbPassword)
                {
                    //console.log(result)
                    if(result) {
                        const accessJWT =await createAccessJWT(user.email,`${user._id}`)
                        const refreshJWT =await createRefreshJWT(user.email,`${user._id}`)
                        
                        res.json({status:"success", message:"User found",AJWT:accessJWT,RJWT:refreshJWT})}
                    else{
                    res.json({status:"Alert", message:"Wrong Password ",user :result})}
                }
        
         
        
    } catch (error) {
       // res.send({status:"error",message:error.message})
       console.log({status:"error",message:error})
        
    }
})

router.post("/reset", async (req,res)=>{
    const user = await findUserByEmail(req.body.email)
    if(!user) return res.send({message:"You will receive email if you have account"})
    const resetPin= await getPin()
    const emailObj ={
        email:user.email,
        pin:resetPin,
        type:'reset-email'
    }
    const getEmail= await insertEmailPin(emailObj)
    if(!getEmail) return console.log("No email found")
    
    console.log(getEmail)
    const sendMail = await sendResetPin( emailObj)
    console.log(sendMail)
   
    //res.send({message:user, pin:resetPin})
    //console.log(getEmail)
    
})

router.patch("/reset", async (req,res)=>{
    try {
        const {email,pin,password}=req.body
    const emailDB = await findByEmailPin(email,pin)
    
   if(!emailDB) return res.send({message:"If your details are correct your password has been reset"})
     
   let pinValidity=emailDB.addedAt
    pinValidity=  pinValidity.setDate(pinValidity.getDate()+1)
    //console.log((pinValidity.toDate))
    const nowTime =  new Date()
    if(nowTime>pinValidity) return res.send({message:"pin expired "})

    const hashedPassword = await (hashPassword(password))
    console.log(hashedPassword)
     updatedPassword= await findEmailPassword(email,hashedPassword)
     res.send({message:"If your details are correct your password has been reset"})
     const emailObj ={
        email:updatedPassword.email,
        pin:null,
        type:'reset-email'
    }
    //if(!updatedPassword) return console.log("No email found")
    
    //console.log(updatedPassword)
    const deletePin = await deleteUserByEmail(email)
    const sendMail = await sendResetPin(emailObj)
    if(updatedPassword && deletePin && sendMail)
    console.log("Password updated and pin deleted and mail sent")

    } catch (error) {
        console.log(error)
    }
    
   
})
module.exports = router