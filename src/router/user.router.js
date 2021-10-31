const express = require("express");
const router = express.Router();
const {insertUser} = require("../model/user/User.model")
const { hashPassword} = require("../helper/bcrypt")
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

module.exports = router