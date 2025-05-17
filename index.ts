import express from 'express'
import http from 'http'
import { Server as SocketIOServer, Socket } from 'socket.io'
import cookie from 'cookie'
import { jwtVerify } from 'jose'
import { AccessTokenPayload } from '@/jwt/access-token'

import next from 'next'
import { Request, Response } from 'express'
import { MessageModel } from './models/Message'

const dev = process.env.NODE_ENV !== 'production'
const APP_URL = process.env.APP_URL ?? 'http://localhost:3000'
const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

const app = express()
const server = http.createServer(app)

export const io = new SocketIOServer(server, {
    cors: {
        credentials: true,
    },
})

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
        console.log(`user ${userId} joined`)
        await socket.join(userId)
        io.to(userId).emit('testFromRoom', 'hello')
        socket.emit('test', 'hello')
    } catch (err) {
        socket.disconnect()
        return
    }

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

const nextApp = next({ dev, dir: '.' })
const handle = nextApp.getRequestHandler()
const port = process.env.PORT || 3000
await nextApp.prepare()

app.use(express.json())

app.post(
    '/notify',
    (
        req: Request<
            any,
            any,
            MessageModel & { receiverId: string; chatroomId: string }
        >,
        res
    ) => {
        const message = req.body
        io.to(message.receiverId).emit('message', message)
        res.status(200).send('Message emitted')
    }
)

app.all(/(.*)/, (req: Request, res: Response) => {
    return handle(req, res)
})

server.listen(port, () => {
    console.log(`> Server listening on http://localhost:${port}`)
})
