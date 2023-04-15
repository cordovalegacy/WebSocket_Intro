const Sockets = require('../models/socket.model')

module.exports = {

    getAllSockets: (req, res) => {
        Sockets.find()
            .then((allSockets) => {
                res.status(200).json(allSockets)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    },

    createSocket: (req, res) => {
        Sockets.create(req.body)
            .then((newSocket) => {
                res.status(201).json(newSocket)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    }

}