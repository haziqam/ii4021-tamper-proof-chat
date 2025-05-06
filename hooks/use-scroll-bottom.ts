import { Message } from '@/types/chat'
import { useEffect, useRef } from 'react'

export function useScrollBottom(messages: Message[]) {
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'instant',
        })
    }, [messages])

    return scrollRef
}
