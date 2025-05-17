import express from 'express'
import http from 'http'
import { Server as SocketIOServer, Socket } from 'socket.io'
import cookie from 'cookie'
import { jwtVerify } from 'jose'
import { AccessTokenPayload } from '@/jwt/access-token'

const app = express()
const server = http.createServer(app)

const APP_DOMAIN = process.env.APP_DOMAIN ?? 'http://localhost:3000'
const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

export const io = new SocketIOServer(server, {
    cors: {
        origin: APP_DOMAIN,
        credentials: true,
    },
})
const port = 54876
io.on('connection', async (socket: Socket) => {
    const rawCookie = socket.handshake.headers.cookie
    const parsedCookies = cookie.parse(rawCookie || '')

    const accessToken = parsedCookies['access-token']
    if (!accessToken) {
        socket.disconnect()
        return
    }

    try {
        const decoded = await jwtVerify<AccessTokenPayload>(accessToken, secret)
        const userId = decoded.payload.userId
        socket.join(userId)
    } catch (err) {
        socket.disconnect()
        return
    }

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

server.listen(port, () => {
    console.log(`Socket.IO server running on port ${port}`)
})
