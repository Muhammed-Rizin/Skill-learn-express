const Express = require('express')
const professionalRoute = Express()
const professionalController = require('../controller/professionalController')
const auth = require('../middleware/auth')

professionalRoute.post('/login', professionalController.professionalLogin)
professionalRoute.post('/register', professionalController.professionalRegister)
professionalRoute.get('/isblocked', auth.verify,professionalController.isBlocked)
professionalRoute.get('/isapproved',auth.verify, professionalController.isApproved)

module.exports = professionalRoute