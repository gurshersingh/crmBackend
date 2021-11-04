const express = require("express");
const router = express.Router();
const {insertUser,findUserByEmail,findUserById } = require("../model/user/User.model")
const { hashPassword, coparePassword} = require("../helper/bcrypt")
const {createAccessJWT,createRefreshJWT,verifyAccessJWT} =require("../helper/jwt")
const {userAuthorization}=require("../middleware/authorization.middle")

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

module.exports = router