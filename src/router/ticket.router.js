const express = require("express")
const router = express.Router()

router.get("/",(req,res)=>{
    
    res.json({message:'hello ticket'})
}),
router.post("/",(req,res)=>{
    console.log(req.body)
    res.send(req.body)})

module.exports=router