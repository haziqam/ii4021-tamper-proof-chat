'use client'

import { useEffect } from 'react'
import { io, Socket } from 'socket.io-client'
import { useChatStore } from '@/state-stores/chat-store'

import { Chatroom, SignedMessage } from '@/types/chat'
import { ChatroomList } from './ChatroomList'

let socket: Socket | null = null

export function ChatroomListWrapper({ chatrooms }: { chatrooms: Chatroom[] }) {
    const setChatrooms = useChatStore((s) => s.setChatrooms)
    const receiveMessage = useChatStore((s) => s.receiveMessage)

    useEffect(() => {
        setChatrooms(chatrooms)
    }, [chatrooms, setChatrooms])

    useEffect(() => {
        socket = io('http://localhost:3000', {
            withCredentials: true,
        })

        socket.on('connect', () => {
            console.log('Connected to Socket.IO server')
        })

        socket.on(
            'message',
            (
                message: SignedMessage & {
                    receiverId: string
                    chatroomId: string
                }
            ) => {
                console.log('Received message: ')
                receiveMessage(message.chatroomId, {
                    ...message,
                    sentAt: new Date(message.sentAt),
                })
            }
        )

        return () => {
            socket?.disconnect()
        }
    }, [])

    return <ChatroomList />
}
