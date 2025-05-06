'use client'

import { Chatroom } from '@/types/chat'
import { ChatroomList } from './ChatroomList'
import { Chatbox } from './Chatbox'
import { useChatStore } from '@/state-stores/chat-store'
import { useEffect } from 'react'

interface MainLayoutProps {
    chatrooms: Chatroom[]
}

export function MainLayout(props: MainLayoutProps) {
    const { chatrooms } = props
    const setChatrooms = useChatStore((state) => state.setChatrooms)

    useEffect(() => {
        setChatrooms(chatrooms)
    }, [chatrooms, setChatrooms])

    return (
        <div className="flex">
            <ChatroomList />
            <Chatbox />
        </div>
    )
}
