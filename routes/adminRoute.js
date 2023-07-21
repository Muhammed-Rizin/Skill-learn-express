const express = require('express')
const adminRoute = express()
const adminController = require('../controller/adminController')


// Admin login
adminRoute.post('/login',adminController.adminLogin)

// User list
adminRoute.get('/get_users', adminController.getUsers)

// User blocking and unblocking
adminRoute.patch('/blockUser',adminController.blockUser)
adminRoute.patch('/unblockUser',adminController.unblockUser)

// Professional list
adminRoute.get('/get_professionals', adminController.getProfessionals)
adminRoute.get('/professional_requests', adminController.getProfessionalReqeust)

adminRoute.patch('/approveprofessionals',adminController.approveProfessionals)
adminRoute.patch('/rejectProfessionals', adminController.rejectProfessionals)
z
adminRoute.patch('/blockprofessionals', adminController.blockProfessionals)
adminRoute.patch('/unblockprofessionals', adminController.unblockProfessionals)
module.exports = adminRoute