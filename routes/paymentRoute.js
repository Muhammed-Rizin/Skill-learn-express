const Express = require('express')
const paymentRoute = Express()
const auth = require('../middleware/auth')

const paymentController = require('../controller/paymentController')

// POST payment/conform
paymentRoute.post('/conform',auth.verify, paymentController.paymentSuccess)

// GET payment/subscribed
paymentRoute.get('/subscribed', paymentController.subscribed)

// GET payment/userhistory
paymentRoute.get('/userhistory', auth.verify, paymentController.userHistory)

// GET payment/professionalhistory
paymentRoute.get('/professionalhistory', auth.verify, paymentController.professionalHistory)

module.exports = paymentRoute