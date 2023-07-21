const express = require('express')
const userRoute = express()
const userController = require('../controller/userController')

userRoute.post('/login',userController.login)
userRoute.post('/register', userController.register)
module.exports = userRoute