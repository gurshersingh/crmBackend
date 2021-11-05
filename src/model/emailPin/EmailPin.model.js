const {EmailPinSchema}=require("./EmailPin.schema")
const insertEmailPin = emailObj =>{
    return new Promise((resolve,reject)=>{

        EmailPinSchema(emailObj)
        .save()
        .then(data => resolve(data))
        .catch(err=> reject(err))
    })
 
}

const findUserByEmail = email =>{
   return new Promise((resolve,reject)=>{
    if(!email) return false
    EmailPinSchema
        .findOne({email},(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })  
    })
 
}
const findByEmailPin = (email,pin) =>{
    return new Promise((resolve,reject)=>{
     if(!email) return false
     EmailPinSchema
         .findOne({email,pin},(error,data)=>{
             if(error){
                 reject(error)
             }
             resolve(data)
         })  
     })
  
 }
const deleteUserByEmail = email =>{
   return new Promise((resolve,reject)=>{
    if(!email) return false
    EmailPinSchema
        .findOneAndRemove({email},(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })  
    })
 
}


module.exports ={
    insertEmailPin,
    findUserByEmail,
    deleteUserByEmail,
    findByEmailPin
    
}