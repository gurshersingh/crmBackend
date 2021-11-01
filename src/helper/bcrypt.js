const bcrypt = require("bcrypt")
const saltRounds = 10

const hashPassword = plainPassword => {
    return new Promise((res)=>{
        res(bcrypt.hashSync(plainPassword,saltRounds))
    })
}
const coparePassword=(plainPassword,dbPassword)=>{
    return new Promise((res,rej)=>{
        bcrypt.compare(plainPassword,dbPassword, function(error,result){
            if (error) rej(error)
            res(result)
        })
    })
}
module.exports={hashPassword,
    coparePassword
}