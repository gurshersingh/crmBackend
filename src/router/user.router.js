const express = require("express");
const router = express.Router();
const {insertUser,findUserByEmail } = require("../model/user/User.model")
const { hashPassword, coparePassword} = require("../helper/bcrypt")
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

router.post("/login", async (req,res)=>{
    try {
        //const hashedPassword = await (hashPassword(req.body.password))
        //req.body.password=hashedPassword
        const {email,password}=req.body
        if(!email||!password){
            return res.json({status:"error", message:"Email or Password missing"})
        }
        const user = await findUserByEmail(email)
          
          if(!user){
              return res.json({status:"fail", message:"No User found"})
          }
                const dbPassword = user._id? user.password:null
                const result = await coparePassword(password,dbPassword)
                {
                    console.log(result)
                    result? res.json({status:"success", message:"User found",user :result}):res.json({status:"Alert", message:"Wrong Password ",user :result})
                }
        
         
        
    } catch (error) {
        res.json({status:"error",message:error.message})
        
    }
})

module.exports = router