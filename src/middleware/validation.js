const Joi =require ("joi")

const email =  Joi.string()
.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })

const pin =  Joi.string().min(6).max(6).required()

const password =  Joi.string()
.alphanum()
.min(3)
.max(30)
.required()

const shrtStrng = Joi.string().min(2).max(50)
const longStrng = Joi.string().min(2).max(500)


const resetPasswordValidation = (req,res,next)=>{
    const schema = Joi.object({email})
    const value = schema.validate(req.body);
    if(value.error){
        return res.json({status:"eror",message:value.error.message})
    }
    next()
}
const resetNewPasswordValidation = (req,res,next)=>{
    const schema = Joi.object({email,pin,password})
    const value = schema.validate(req.body);
    if(value.error){
        return res.json({status:"eror",message:value.error.message})
    }
    next()
}
const ticketReplyMsgValidation = (req,res,next)=>{
    const schema = Joi.object({message:longStrng,sender:shrtStrng.required()})
    const value = schema.validate(req.body);
    if(value.error){
        return res.json({status:"eror",message:value.error.message})
    }
    next()
}

module.exports={
    resetPasswordValidation,
    resetNewPasswordValidation,
    ticketReplyMsgValidation
}