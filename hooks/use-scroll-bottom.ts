import { Message } from '@/types/chat'
import { useEffect, useRef } from 'react'

export function useScrollBottom(messages: Message[]) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        containerRef.current?.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: 'instant',
        })
    }, [messages])

    return containerRef
}
