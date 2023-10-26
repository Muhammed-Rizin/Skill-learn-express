const express = require('express')
const userRoute = express()

const auth = require('../middleware/auth')
const userController = require('../controller/userController')
const chatController = require('../controller/chatController')
const taskController = require('../controller/taskController')
const meetingcontroller = require('../controller/meetingController')


// POST /user/login
userRoute.post('/login',userController.login)

// GET /user/checkemail

// POST /user/register
userRoute.post('/register', userController.register)

// GET  /user/forgetpassword
// GET /user/forgetpassword/user_details
// POST /user/newpassword
// GET /user/isblocked
userRoute.get('/isblocked', auth.verify, userController.isBlocked)

// GET /user/userdata
userRoute.get('/userdata', auth.verify, userController.userData)

// GET /user/userdatabyemail
userRoute.get('/userdatabyemail', auth.verify, userController.userDatabyEmail)

// GET /user/getchats
userRoute.get('/getchats',auth.verify, chatController.getChats)

// GET /user/getchathistory
userRoute.get('/getchathistory',auth.verify, chatController.getChatHistory)

// PATCH /user/updateuser
userRoute.get('/updateuser', auth.verify, userController.updateUser)

// GET /user/sendverifymail
// GET /user/verifyemail

// GET /user/professionalsdata
userRoute.get('/professionalsdata',userController.professionalsList)

// POST /user/uploadimage

// GET /user/inprogresstask
userRoute.get('/inprogresstask', auth.verify, taskController.getInprogressTaskUser)

// GET /user/completedtask
userRoute.get('/completedtask', auth.verify, taskController.getCompletedTaskUser)

// PATCH /user/taskdone
userRoute.patch('/tasldone', auth.verify, taskController.taskDone)

// GET /user/inprogressmeeting
userRoute.get('/inprogressmeeting', auth.verify, meetingcontroller.getInpogressMeetingUser)

// GET /user/completedmeeting
userRoute.get('/completedmeeting', auth.verify, meetingcontroller.getCompleteMeetingUser)

// PATCH /user/setnotification
userRoute.patch('/setnotification', userController.setNotification)

// PATCH /user/messageseen
userRoute.patch('/messageseen', auth.verify, chatController.updateUserStatus)

module.exports = userRoute