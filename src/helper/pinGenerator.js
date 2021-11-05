const getPin =()=>{
let pin =''
    const minLength=6
    const maxLength=6
    for (let i = 0; i < maxLength; i++) {
        pin+= Math.floor(Math.random()*10)
        
    }
    return pin
} 
module.exports = {
    getPin
}
