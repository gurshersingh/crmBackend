const {UserSchema}=require("./User.schema")
const insertUser = userObj =>{
    return new Promise((resolve,reject)=>{

        UserSchema(userObj)
        .save()
        .then(data => resolve(data))
        .catch(err=> reject(err))
    })
 
}

const findUserByEmail = email =>{
    
    
   return new Promise((resolve,reject)=>{
    if(!email) return false
        

        UserSchema
        .findOne({email},(error,data)=>{
            if(error){
                reject(error)
            }
            resolve(data)
        })
        
    })
 
}
module.exports ={
    insertUser,
    findUserByEmail
}