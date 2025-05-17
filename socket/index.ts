import express from 'express'
import http from 'http'
import { Server as SocketIOServer, Socket } from 'socket.io'
import cookie from 'cookie' // npm install cookie

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

    // Parse and log cookies
    const rawCookie = socket.handshake.headers.cookie
    const parsedCookies = cookie.parse(rawCookie || '')
    console.log('Cookies:', parsedCookies)

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
