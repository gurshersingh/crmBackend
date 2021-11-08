const redis = require("redis")
const client = redis.createClient(process.env.REDIS_URL)
//REDIS_URL=redis://localhost:6379
const setJWT = (key,value)=>{
    try {
        //console.log(key," VALUE ",value)
        return new Promise((res,rej)=>{
            client.set(key, value, (error,response)=>{
                if(error) {
                    rej(error)
                    console.log("Error;", error)
                }
                res(response)
                console.log(response)
        })
    
        })
    } catch (error) {
        rej(error)
    }
    
}
const getJWT = (key)=>{
    try {
        return new Promise((res,rej)=>{
            client.get(key,  (error,response)=>{
                if(error|| null) rej(error)
                res(response)
                //console.log("chalpea..",response)
        })
    
        })
    } catch (error) {
        rej(error)
    }
    
}
const deleteJWT = key =>{
    try {
        return Promise.resolve( client.del(key))
    } catch (error) {
        console.log(error)
    }
}

module.exports={ 
    setJWT,
    getJWT,
    deleteJWT
}