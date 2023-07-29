const { Server } = require('socket.io')
const Message = require('../model/chatModel');
const { default: mongoose } = require('mongoose');

const configureSocket = async (http) => {

    const io = new Server(http, {
        cors: { origin: ['http://localhost:3000'] }
    })

    io.use((socket, next) => {
        socket.user = socket.handshake.auth.userId
        next()
    })
    io.on('connection', (socket) => {
        socket.on("join", (roomName) => {
            socket.join(roomName);
        });

        socket.on("message", ({ message, roomName, from, to, type, receverType }, callback) => {
            try {
                Message.findOneAndUpdate(
                    { roomId: roomName },
                    {
                        $push: { messages: {
                             text: message, sender: from, senderType: type, time : Date.now(), receverType : receverType, recever : to
                            } },
                        $addToSet: { users: [from, to] },
                    },
                    { upsert: true, new: true },
                ).then((newMessage) => {
                    Message.findOne({ roomId: roomName })
                        .populate('messages.sender')
                        .populate('messages.recever')
                        .then((data) => {
                            io.to(roomName).emit("message", { sender : from, text : message, recever: to, data });
                            callback({
                                status: "ok"
                            });
                        })
                }).catch((error) => {
                    console.error('Error saving private message to MongoDB:', error.message);
                });
            } catch (error) {
                console.log(error.message)
            }
        });
    });




    return io
}

module.exports = configureSocket