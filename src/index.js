const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const { emit } = require('process')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New Websocket connection')

    socket.emit('message', 'Welcome')
    socket.broadcast.emit('message', 'A new user joined!')

    socket.on('sendMessage', (message, callback) => {
        io.emit('message', message)
        callback('Delivered')

    })

    socket.on('sendLocation', (coords) => {
        io.emit('message', 'https://google.com/maps?q=${coords.latitude},${coords.longitude}')

    })

    })


server.listen(port, () => {
    console.log ('Server is up on port ${port}!')

})