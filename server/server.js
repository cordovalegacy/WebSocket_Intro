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

const server = app.listen(port, () => { //this is an express instance and we will be passing it to the socket instance
    console.log(`Listening on port: ${port}`)
})

const io = socket(server, { //this is a socket.io instance, and are using the socket method from the class
    cors: {
        origin: ['http://localhost:5173', 'http://localhost:5174'], //vite port
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true
    }
})

io.on("connection", socket => { //this is called an event listener
    console.log(`socket id: ${socket.id}`)
    console.log("Nice to meet you! (shakes hand)")
    // socket.emit("event_to_specific_client", data => {
    //     console.log("Welcome to our chat!", data)
    // })
    socket.on("event_from_client", data => {
        console.log("Received a message from client with socket id" + socket.id)
        io.emit("event_to_all_other_clients", { sender: socket.id, content: data, timestamp: new Date().getTime() })
    })
})