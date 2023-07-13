const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const dotenv=require("dotenv")
dotenv.config()

mongoose.connect(process.env.mongoDb).then(()=> console.log('Mongodb server connected'))
.catch(()=> console.log('Mongodb server not connected'))

const userRoute = require('./routes/userRoute')

app.use(cors({
    credentials:true,
    origin:['http://localhost:3000']
}))

app.use(cookieParser())
app.use(express.json())

app.use('/api',userRoute) 
app.listen(5000,()=>console.log("Server Conected"))