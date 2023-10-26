const Meeting = require('../model/scheduleModel')

exports.scheduleMeeting = async (req, res) => {
    try {
        const meeting = req.body.schedule
        const id = req.body.userid
        const data = new Meeting ({
            from : id,
            to : meeting.user,
            topic : meeting.topic,
            description : meeting.description,
            time : meeting.time
        })
        await data.save()
        res.status(200).json({message : 'success'})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({status: 'error', message: 'internal server error'}) 
    }
}

exports.getInpogressMeetingProfessional = async (req, res) => {
    try {
        const page = req.query.page
        const id = req.body.userid

        const limit = 5
        const skip = (page - 1) * limit
        const now = new Date()

        const data = await Meeting.find({from : id, time :{$gte : now}}).populate('to')
        .sort({time : 1}).skip(skip).limit(limit)
        const total = (await Meeting.find({from : id, time :{$gte : now}}).populate('to')).length

        res.status(200).json({data, total})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({status: 'error', message: 'internal server error'}) 
    }
}

exports.getCompleteMeetingProfessional = async (req, res) => {
    try {
        const page = req.query.page
        const id = req.body.userid 

        const limit = 5
            const skip = (page - 1) * limit
        const now = new Date()

        const data = await Meeting.find({from : id, time :{$lte : now}}).populate('to')
        .sort({time : -1}).skip(skip).limit(limit)
        const total = (await Meeting.find({from : id, time :{$lte : now}}).populate('to')).length

        res.status(200).json({data,total})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({status: 'error', message: 'internal server error'}) 
    }
}

exports.meetingDone = async (req, res) => {
    try {
        const id = req.body.id
        const data = await Meeting.findByIdAndUpdate(id, {$set : {completed : true}}).sort({endtime : 1})
        
        res.status(200).json(data)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({status: 'error', message: 'internal server error'}) 
    }
}


exports.getInpogressMeetingUser = async (req, res) => {
    try {
        const page = req.query.page
        const id = req.body.userid

        const limit = 5
        const skip = (page - 1) * limit
        const now = new Date()

        const data = await Meeting.find({to : id, time :{$gte : now}}).populate('to')
        .sort({time : 1}).skip(skip).limit(limit)
        const total = (await Meeting.find({to : id, time :{$gte : now}}).populate('to')).length

        res.status(200).json({data, total})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({status: 'error', message: 'internal server error'}) 
    }
}

exports.getCompleteMeetingUser = async (req, res) => {
    try {
        const page = req.query.page
        const id = req.body.userid 

        const limit = 5
            const skip = (page - 1) * limit
        const now = new Date()

        const data = await Meeting.find({to : id, time :{$lte : now}}).populate('from')
        .sort({time : -1}).skip(skip).limit(limit)
        const total = (await Meeting.find({to : id, time :{$lte : now}}).populate('from')).length

        res.status(200).json({data,total})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({status: 'error', message: 'internal server error'}) 
    }
}