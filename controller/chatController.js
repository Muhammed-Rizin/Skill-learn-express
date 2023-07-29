const Message = require('../model/chatModel')

const getUserChats = async (req,res) => {
    try {
        const { userid } = req.body
        const userDetails = await Message.find({
            $or : [{'messages.sender' : userid },{ users : userid }]
        }).populate('messages.sender').populate('messages.recever')
        res.status(200).json(userDetails)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : 'internal server error'})
    }
}

const getChatHistory = async (req,res) => {
    try {
        const {roomid} = req.query
        const chatData = await Message.findOne({roomId : roomid}).populate('messages.sender').populate('messages.recever')
        return res.status(200).json(chatData)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : 'internal server error'})
    }
}

module.exports = {
    getUserChats,
    getChatHistory
}