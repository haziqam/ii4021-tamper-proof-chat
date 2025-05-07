'use client'

import { Chatroom } from '@/types/chat'
import { ChatroomList } from './ChatroomList'
import { Chatbox } from './Chatbox'
import { useChatStore } from '@/state-stores/chat-store'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'

interface ChatLayoutProps {
    chatrooms: Chatroom[]
}

export function ChatLayout({ chatrooms }: ChatLayoutProps) {
    const { chatroomId } = useParams()
    const { activeChatroom, setChatrooms, setActiveChatroom } = useChatStore()

    useEffect(() => {
        setChatrooms(chatrooms)
        if (
            typeof chatroomId === 'string' &&
            chatroomId !== activeChatroom?.chatroomId
        ) {
            setActiveChatroom(chatroomId)
        }
    }, [
        chatrooms,
        chatroomId,
        activeChatroom?.chatroomId,
        setChatrooms,
        setActiveChatroom,
    ])

    return (
        <div className="flex">
            <ChatroomList />
            <Chatbox />
        </div>
    )
}
