const SocketsController = require('../controllers/socket.controller')

module.exports = (app) => {
    app.get('/api/sockets', SocketsController.getAllSockets)
    app.post('/api/sockets', SocketsController.createSocket)
}