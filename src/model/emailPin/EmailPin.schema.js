const mongoose= require("mongoose")
const Schema = mongoose.Schema
const EmailPinSchema = new Schema({
    
    pin:{
        type:String,
        maxlength:6,
        minlength:6
        
    },
    email:{
        type:String,
        maxlength:50,
        required:true
    },
    addedAt:{
        type:Date,
        required:true,
        default: Date.now()
    }
    
})

module.exports = {
    EmailPinSchema:mongoose.model( 'EmailPin',EmailPinSchema)}