
const jwt = require("jsonwebtoken")
const{setJWT,getJWT} =require("./redis")
const {storeUserRefreshJWT} = require("../model/user/User.model")

const createAccessJWT = async (email,_id) =>{
    try {
        const accessJWT = jwt.sign({_id},process.env.JWT_ACCESS_SECRET,{expiresIn:"15m"})
        //console.log("acessJWT "+ accessJWT)
        await setJWT(accessJWT,_id)
        //await getJWT(accessJWT)
       
         return Promise.resolve(accessJWT)
    } catch (error) {
        return Promise.reject(accessJWT)
    }
    
}
const createRefreshJWT = async(email,_id) =>{
    try {
        const refreshJWT = jwt.sign({_id},process.env.JWT_REFRESH_SECRET,{expiresIn:"30d"})
        //console.log("refresh "+refreshJWT)
        await storeUserRefreshJWT(refreshJWT,_id)
        return Promise.resolve(refreshJWT)
        
    } catch (error) {
        return Promise.reject(refreshJWT)
    }
}

module.exports={
    createAccessJWT,
    createRefreshJWT
}