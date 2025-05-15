'use client'

import { useEffect } from 'react'
import { useChatStore } from '@/state-stores/chat-store'
import { Chatroom } from '@/types/chat'
import { ChatroomList } from './ChatroomList'

export function ChatroomListWrapper({ chatrooms }: { chatrooms: Chatroom[] }) {
    const setChatrooms = useChatStore((s) => s.setChatrooms)

    useEffect(() => {
        setChatrooms(chatrooms)
    }, [chatrooms, setChatrooms])

    return <ChatroomList />
}
