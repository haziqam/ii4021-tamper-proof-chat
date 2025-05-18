'use client'

import { useEffect } from 'react'
import { io, Socket } from 'socket.io-client'
import { useChatStore } from '@/state-stores/chat-store'

import { Chatroom, SignedMessage } from '@/types/chat'
import { ChatroomList } from './ChatroomList'
import { useParams } from 'next/navigation'

let socket: Socket | null = null
const appUrl = process.env.NEXT_PUBLIC_APP_URL

export function ChatroomListWrapper({ chatrooms }: { chatrooms: Chatroom[] }) {
    const params = useParams()
    const chatroomId = params.chatroomId as string

    const setChatrooms = useChatStore((s) => s.setChatrooms)
    const receiveMessage = useChatStore((s) => s.receiveMessage)

    useEffect(() => {
        setChatrooms(chatrooms)
    }, [chatrooms, setChatrooms])

    useEffect(() => {
        socket = io(appUrl, {
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
                receiveMessage(
                    message.chatroomId,
                    {
                        ...message,
                        sentAt: new Date(message.sentAt),
                    },
                    message.chatroomId === chatroomId
                )
            }
        )

        return () => {
            socket?.disconnect()
        }
    }, [])

    return <ChatroomList />
}
