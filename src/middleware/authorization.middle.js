const {verifyAccessJWT}=require("../helper/jwt")
const {getJWT} =require("../helper/redis")
const userAuthorization = async (req,res,next) =>{
    const {authorization} = req.headers
    //console.log(authorization)
    const decoded = await verifyAccessJWT(authorization)
    console.log(decoded)
    if(!decoded.email){
        return res.status(404).json({message:"forbidden"})}
    const user = await getJWT(authorization)
    if(user) {
        req.id=user
        return next()}
    return res.status(404).json({message:"forbidden"})
}

module.exports = {userAuthorization}