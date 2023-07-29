const express = require('express')
const userRoute = express()
const userController = require('../controller/userController')
const chatController = require('../controller/chatController')
const auth = require('../middleware/auth')

userRoute.post('/login',userController.login)
userRoute.post('/register', userController.register)
userRoute.get('/userdata', auth.verify, userController.userData)
userRoute.get('/userdatabyemail', auth.verify, userController.userDatabyEmail)
userRoute.get('/getchats',auth.verify, chatController.getUserChats)
userRoute.get('/getchathistory',auth.verify, chatController.getChatHistory)
module.exports = userRoute