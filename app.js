const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const httpServer = require('http').createServer(app);
const dotenv = require("dotenv");dotenv.config()

const configureSocket = require('./socket/socket');
const userRoute = require('./routes/userRoute')
const professionalRoute = require('./routes/professionalRoute')
const adminRoute = require('./routes/adminRoute')
const reviewRoute = require('./routes/reviewRoute')
const paymentRoute = require('./routes/paymentRoute')

mongoose.connect(process.env.mongoDb)
.then(() => console.log('Mongodb server connected'))
.catch(() => console.log('Mongodb server not connected'))

const io = configureSocket(httpServer)

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
}))


app.use('/user', userRoute)
app.use('/admin', adminRoute)
app.use('/professional', professionalRoute)
app.use('/review', reviewRoute)
app.use('/payment', paymentRoute)

httpServer.listen(5000, () => console.log("Server Conected"))