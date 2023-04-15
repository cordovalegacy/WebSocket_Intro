const express = require('express')
const cors = require('cors')
const app = express()
const socket = require('socket.io')

const port = 8000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

require('./config/mongoose.config')
require('./routes/socket.routes')(app)

const server = app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})

const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true
    }
})

io.on("connection", socket => {
    console.log(`socket id: ${socket.id}`)
    socket.on("event_from_client", data => {
        socket.broadcast.emit("event_to_all_other_clients", data)
    })
})