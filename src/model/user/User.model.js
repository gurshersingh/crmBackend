const { hashPassword } = require("../../helper/bcrypt")
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

const findUserById= id =>{
    return new Promise((resolve,reject)=>{
     if(!id) return false
         UserSchema
         .findOne({id},(error,data)=>{
             if(error){
                 reject(error)
             }
             resolve(data)
         })  
     })
  
 }
const storeUserRefreshJWT =(token,_id)=>{
    try {
        console.log("token", token," ID ",_id)
        return new Promise((resolve,reject)=>{
            UserSchema.findByIdAndUpdate({_id},{$set:{"refreshJWT.token":token,
            "refreshJWT.addedAt":Date.now()}},
           { new:true})
        .then((data)=>{
            console.log(data)
            resolve(data)
        }).catch((error)=>{
            console.log(error)
            reject(error)
        })
    })
        
    } catch (error) {
        reject(error)
    }

}
const findEmailPassword =(email,password)=>{
    try {
        //console.log("token", token," ID ",_id)
        return new Promise((resolve,reject)=>{
            UserSchema.findOneAndUpdate({email},{$set:{"password":password}},
           { new:true})
        .then((data)=>{
            console.log(data)
            resolve(data)
        }).catch((error)=>{
            console.log(error)
            reject(error)
        })
    })
        
    } catch (error) {
        reject(error)
    }

}
module.exports ={
    insertUser,
    findUserByEmail,
    storeUserRefreshJWT,
    findUserById,
    findEmailPassword
}