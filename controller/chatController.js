const Message = require('../model/chatModel')

const getChats = async (req,res) => {
    try {
        const userid = req.body.userid
        const chatDetails = await Message.find({ $or: [{ 'messages.sender': userid }, { users: userid }] })
            .populate('messages.sender').populate('messages.recever')
        res.status(200).json(chatDetails)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'internal server error' })
    }
}

const getChatHistory = async (req,res) => {
    try {
        let {roomid, page , limit} = req.query
        limit = Number(limit)
        const skip = (page - 1) * limit
        let chatData = await Message.findOne({ roomId: roomid }).populate('messages.sender').populate('messages.recever')
        
        if(chatData == null){
            res.status(404).json({message : "Invalid roomid"})
        }
        const total = chatData?.messages?.length
        const start = total - (skip + limit) >0 ? total - (skip + limit) : 0
        chatData.messages = chatData.messages.slice(start, total - skip)
    
        res.status(200).json({chatData, total})
    } catch (error) {
        console.log(error)
        res.status(500).json({message : 'internal server error'})
    }
}

const updateUserStatus = async (req, res) => {
    try {
        const roomId = req.query.roomid
        await Message.findOneAndUpdate({roomId : roomId}, {$set : {userRead : true}})
        return res.status(200).json({message : 'success'})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: 'internal server error' })
    }
}

const updateProfessionalStatus = async (req, res) => {
    try {
        const roomId = req.query.roomid
        await Message.findOneAndUpdate({roomId : roomId}, {$set : {professionalRead : true}})
        return res.status(200).json({message : 'success'})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: 'internal server error' })
    }
}


module.exports = {
    getChats,
    getChatHistory,
    updateUserStatus,
    updateProfessionalStatus
}