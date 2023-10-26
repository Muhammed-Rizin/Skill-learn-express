const Task = require('../model/taskModel')

exports.addTask = async (req, res) => {
    try {
        const task = req.body.task
        const id = req.body.userid

        const data = new Task({
            from : id,
            to : task.user,
            task : task.task,
            description : task.description,
            endtime : task.endtime
        })

        await data.save()
        res.status(200).json({message : 'success'})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({status: 'error', message: 'internal server error'}) 
    }
}

exports.getInprogressTaskProfessional = async (req, res) => {
    try {
        const page = req.query.page
        const id = req.body.userid
        const now = new Date()

        const limit = 5 
        const skip = (page - 1) * limit

        const data = await Task.find({from : id, endtime :{$gte : now}}).populate('to').sort({endtime : -1}).skip(skip).limit(limit)
        const total = (await Task.find({from : id, endtime :{$gte : now}})).length

        res.status(200).json({data, total})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({status: 'error', message: 'internal server error'}) 
    }
}

exports.getCompletedTaskProfessional = async (req, res) => {
    try {
        const page = req.query.page
        const id = req.body.userid
        const now = new Date()

        const limit = 5 
        const skip = (page - 1) * limit

        const data = await Task.find({from : id, endtime :{$lte : now}}).populate('to').sort({endtime : -1}).skip(skip).limit(limit)
        const total = (await Task.find({from : id, endtime :{$lte : now}})).length

        res.status(200).json({data, total})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({status: 'error', message: 'internal server error'})         
    }
}

exports.getInprogressTaskUser = async(req, res) => {
    try {
        const page = req.query.page
        const id = req.body.userid
        const now = new Date()

        const limit = 5 
        const skip = (page - 1) * limit

        const data = await Task.find({to : id, endtime :{$gte : now}}).populate('from').sort({endtime : -1}).skip(skip).limit(limit)
        const total = (await Task.find({to : id, endtime :{$gte : now}})).length

        res.status(200).json({data, total})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({status: 'error', message: 'internal server error'}) 
    }
}

exports.getCompletedTaskUser = async (req, res) => {
    try {
        const page = req.query.page
        const id = req.body.userid
        const now = new Date()

        const limit = 5 
        const skip = (page - 1) * limit

        const data = await Task.find({to : id, endtime :{$lte : now}}).populate('from').sort({endtime : -1}).skip(skip).limit(limit)
        const total = (await Task.find({to : id, endtime :{$lte : now}})).length

        res.status(200).json({data, total})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({status: 'error', message: 'internal server error'})         
    }
}

exports.taskDone = async (req, res) => {
    try {
        const id = req.body.taskid
        const data = await Task.findByIdAndUpdate(id, {$set : {completed : true}}).sort({endtime : 1})
        res.status(200).json(data)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({status: 'error', message: 'internal server error'}) 
    }
}