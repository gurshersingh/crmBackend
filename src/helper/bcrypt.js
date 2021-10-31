const bcrypt = require("bcrypt")
const saltRounds = 10

const hashPassword = plainPassword => {
    return new Promise((res)=>{
        res(bcrypt.hashSync(plainPassword,saltRounds))
    })
}
module.exports={hashPassword}