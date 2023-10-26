const Express = require('express')
const professionalRoute = Express()

const auth = require('../middleware/auth')
const professionalController = require('../controller/professionalController.js')
const taskController = require('../controller/taskController')
const meetingController = require('../controller/meetingController')
const chatController = require('../controller/chatController')

// POST /professional/login
professionalRoute.post('/login', professionalController.professionalLogin)

// POST /professional/register 
professionalRoute.post('/register', professionalController.professionalRegister)

// GET /user/checkemail
professionalRoute.get('/checkemail', professionalController.checkEmail)

// GET /professional/userdatabyemail
professionalRoute.get('/userdatabyemail', auth.verify, professionalController.userDataByEmail)

// GET /professional/forgetpassword
// GET /professional/forgetpassword/professional_details

// POST /professional/newpassword
professionalRoute.post('/newpassword', professionalController.newPassword)

// GET /professional/isblocked
professionalRoute.get('/isblocked', auth.verify,professionalController.isBlocked)

// GET /professional/isapproved
professionalRoute.get('/isapproved',auth.verify, professionalController.isApproved)

// GET /professional/professionaldata
professionalRoute.get('/professionaldata',auth.verify, professionalController.professionalData)

// PATCH /professional/updateprofessional
professionalRoute.patch('/updateprofessional', auth.verify, professionalController.updateProfile)

// GET /professional/getchats
professionalRoute.get('/getchats', auth.verify, chatController.getChats)

// GET /professional/getchathistory
professionalRoute.get('/getchathistory', auth.verify, chatController.getChatHistory)

// GET /professional/verifyemail
// GET /professional/sendverifymail
// POST /professional/uploadimage

// GET /professional/getsubscribers

// POST /professional/addTask
professionalRoute.post('/addTask', auth.verify, taskController.addTask)

// GET /professioanl/inprogresstask
professionalRoute.get('/inprogresstask', auth.verify, taskController.getInprogressTaskProfessional)

// GET /professioanl/completedtask
professionalRoute.get('/completedtask', auth.verify, taskController.getCompletedTaskProfessional)

// POST /professional/schedule
professionalRoute.post('/schedule', auth.verify, meetingController.scheduleMeeting)
 
// GET /professional/inprogressmeeting
professionalRoute.get('/inprogressmeeting', auth.verify, meetingController.getInpogressMeetingProfessional)

// GET /professional/completedmeeting
professionalRoute.get('/completedmeeting', auth.verify, meetingController.getCompleteMeetingProfessional)

// PATCH /professional/meetingdone
professionalRoute.patch('/meetingdone', auth.verify, meetingController.meetingDone)

// PATCH /professional/setnotification
professionalRoute.patch('/setnotification', professionalController.setNotification)

// PATCH /professional/messageseen
professionalRoute.patch('/messageseen',auth.verify, chatController.updateProfessionalStatus)



module.exports = professionalRoute