const Review = require('../model/reviewModel')

exports.addReview = async (req, res) => {
    try {
        const data = req.body.data
        const professionalId = req.body.id
        const id = req.body.userid
        const review = new this._reviewModel({
            title : data.title,
            description : data.description,
            rating: data.rating,
            user : id,
            professional : professionalId
        })
        
        const result = await review.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(200).json({message : 'Internal server error'})
    }
}
exports.reviews = async (req, res) => {
    try {
        const id = req.query.id
        const page = req.query.page

        const limit = 2
        const skip = (page - 1) * limit

        const data = await Review.find({professional : id}).populate('user')
        .sort({createdAt : -1}).skip(skip).limit(limit)

        const total = (await Review.find({professional : id})).length
        res.status(200).json({data, total})
    } catch (error) {
        res.status(200).json({message : 'Internal server error'})
        
    }
}