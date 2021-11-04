require("dotenv").config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const port = process.env.port||3001


//API security
//app.use(helmet());

//Handle CORS error
app.use(cors());

//database
const mongoose=require('mongoose')
mongoose.connect(`${process.env.CONNECTION_URL}`, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() =>{
    console.log("connected")
})
.catch((error) => console.log(`${error} did not connect`));

//Logger
app.use(morgan("tiny"));

//Set body-parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Load Router
const userRouter = require('./src/router/user.router')
const ticketRouter = require('./src/router/ticket.router')
const tokenRouter = require('./src/router/token.router')

//Use Router
app.use('/v1/user',userRouter)
app.use('/v1/ticket',ticketRouter)
app.use('/v1/tokens',tokenRouter)

const errorHandler = require('./src/utils/errorHandler')
app.use((req,res,next)=>{
    const error= new Error("Resource Not found")
    error.status=404
    next((error))
})

app.use((error,req,res,next)=>{
    console.log(error.message)
    errorHandler(error,res)
    next()
})


app.listen(port,()=>{
console.log( `app is running at http://localhost:${port}`)
})





