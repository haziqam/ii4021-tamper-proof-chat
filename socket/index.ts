import express from 'express'
import http from 'http'
import { Server as SocketIOServer, Socket } from 'socket.io'

const app = express()
const server = http.createServer(app)
export const io = new SocketIOServer(server, {
    cors: {
        origin: '*',
    },
})
const port = 9999

io.on('connection', (socket: Socket) => {
    console.log('New user connected')

    socket.on('createMessage', (message: any) => {
        console.log('New message:', message)
        io.emit('newMessage', message)
    })

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

server.listen(port, () => {
    console.log(`Socket.IO server running on port ${port}`)
})
