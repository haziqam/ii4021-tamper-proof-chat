'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useChatStore } from '@/state-stores/chat-store'
import { Chatbox } from './Chatbox'

export default function ChatPage() {
    const searchParams = useSearchParams()
    const chatroomId = searchParams.get('chatroomId')
    const activeChatroom = useChatStore((s) => s.activeChatroom)
    const setActiveChatroom = useChatStore((s) => s.setActiveChatroom)

    useEffect(() => {
        if (!chatroomId || activeChatroom?.id === chatroomId) return
        setActiveChatroom(chatroomId)
    }, [chatroomId])

    return <Chatbox />
}
