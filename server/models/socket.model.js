const mongoose = require('mongoose')

const SocketSchema = new mongoose.Schema({
    name: {
        type: String
    }
}, {timestamps: true})

const Sockets = mongoose.model("Socket", SocketSchema)
module.exports = Sockets
