const Express = require('express')
const reviewRoute = Express()

const auth = require('../middleware/auth')
const reviewController = require('../controller/reviewController')

// POST review/addreview
reviewRoute.post('/addreview',auth.verify, reviewController.addReview)
// GET review/getreviews
reviewRoute.get('/getreviews', auth.verify, reviewController.reviews)

// GET review/professionalreviews
reviewRoute.get('/professionalreviews', auth.verify, reviewController.reviews)

module.exports = reviewRoute