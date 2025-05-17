'use client'

import { useEffect } from 'react'
import { io, Socket } from 'socket.io-client'
import { useChatStore } from '@/state-stores/chat-store'

import { Chatroom } from '@/types/chat'
import { ChatroomList } from './ChatroomList'

let socket: Socket | null = null

export function ChatroomListWrapper({ chatrooms }: { chatrooms: Chatroom[] }) {
    const setChatrooms = useChatStore((s) => s.setChatrooms)

    useEffect(() => {
        setChatrooms(chatrooms)
    }, [chatrooms, setChatrooms])

    useEffect(() => {
        // Connect to Socket.IO server
        socket = io('http://localhost:9999', {
            withCredentials: true, // allows cookies to be sent if needed
        })

        socket.on('connect', () => {
            console.log('Connected to Socket.IO server')
        })

        socket.on('disconnect', () => {
            console.log('Disconnected from Socket.IO server')
        })

        socket.on('message', (message) => {
            console.log('Received message: ')
            console.log(message)
        })

        // Cleanup on unmount
        return () => {
            socket?.disconnect()
        }
    }, [])

    return <ChatroomList />
}
