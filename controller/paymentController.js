const Payment = require('../model/paymentModel')


exports.paymentSuccess = async (req, res) => {
    try {
        const data = req.body.data
        const newOrder = new Payment({
            amount: data.amount,
            from: data.from,
            paymentId: data.from,
            to: data.to
        })

        const result = await newOrder.save()
        return res.status(200).json(result)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : 'internal server error'})
    }
}

exports.subscribed = async (req, res) => {
    try {
        const {from , to} = req.query
        const data = await Payment.find({from : from, to : to})

        res.status(200).json(data[data.length - 1])
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : 'internal server error'})
    }
}

exports.userHistory = async (req, res) => {
    try {
        const { page, limit } = req.query
        const { userid } = req.body
    
        const skip = (page - 1) * limit
        const data = await Payment.find({from : userid}).populate('to').sort({createdAt : -1}).skip(skip).limit(limit)
        const total = (await Payment.find({from : userid})).length
        
        res.status(200).json({data, total})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : 'internal server error'})
    }
}

exports.professionalHistory = async (req, res) => {
    try {
        const { page, limit } = req.query
        const { userid } = req.body
    
        const skip = (page - 1) * limit
        const data = await Payment.find({to : userid}).populate('from').sort({createdAt : -1}).skip(skip).limit(limit)
        const total = (await Payment.find({to : userid})).length
        
        res.status(200).json({data, total})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message : 'internal server error'})
    }
}