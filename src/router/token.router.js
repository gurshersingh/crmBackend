const express = require("express")
//const { NativeDate } = require("mongoose")
const {verifyRefreshJWT,createAccessJWT}=require("../helper/jwt")
const{findUserByEmail}=require("../model/user/User.model")
const router = express.Router()

router.get("/",async (req,res)=>{
    const {authorization}=req.headers
    const decoded = await verifyRefreshJWT(authorization)
    if(decoded.email){
        const user= await findUserByEmail(decoded.email)
        console.log(user)
        let expDate=(user.refreshJWT.addedAt)
        const tokenDb=user.refreshJWT.token
        expDate= expDate.setDate(expDate.getDate()+ +process.env.REFRESH_EXP_DAYS)
        const today=new Date()
        if(tokenDb!==authorization && expDate<today)
        return res.json({message: "Token Expired"})
        
        const accessToken = await createAccessJWT(user.email,user._id.toString())
        res.json({message: accessToken})
    }
    
}),


module.exports=router