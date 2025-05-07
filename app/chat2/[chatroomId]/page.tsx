'use client'

import { useParams } from 'next/navigation'
import { Chatbox } from './Chatbox'
import { useEffect } from 'react'
import { useChatStore } from '@/state-stores/chat-store'

export default function ChatPage() {
    const { chatroomId } = useParams()
    const setActiveChatroom = useChatStore((state) => state.setActiveChatroom)

    useEffect(() => {
        if (chatroomId) {
            setActiveChatroom(chatroomId.toString())
        }
    }, [chatroomId])

    return <Chatbox />
}
