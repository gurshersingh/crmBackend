const {verifyAccessJWT}=require("../helper/jwt")
const {getJWT,deleteJWT} =require("../helper/redis")
const userAuthorization = async (req,res,next) =>{
    const {authorization} = req.headers
    try {
   //console.log(authorization)
    const decoded = await verifyAccessJWT(authorization).then((data)=>data)
    .catch(async(err)=>{
        //await deleteJWT(authorization)
        console.log("deleted")
        return err
    })
    //console.log(decoded)
    if(decoded.email)
        {
            const user = await getJWT(authorization)
            if(user) {
                req.id=user
                return next()}
            return res.status(404).json({message:"forbidden"})
           
        }
        return res.status(404).json({message:"forbidden"})
    } catch (error) {
        return res.status(404).json({message:"forbidden"})
        
    }
    
}


module.exports = {userAuthorization}