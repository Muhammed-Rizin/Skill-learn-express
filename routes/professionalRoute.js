const Express = require('express')
const professionalRoute = Express()
const professionalController = require('../controller/professionalController')

professionalRoute.post('/login', professionalController.professionalLogin)
professionalRoute.post('/register', professionalController.professionalRegister)

module.exports = professionalRoute