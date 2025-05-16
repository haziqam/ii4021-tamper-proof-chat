import { Message } from '@/types/chat'
import { useEffect, useRef } from 'react'

export function useScrollBottom(messages: Message[]) {
    const bottomElementRef = useRef<HTMLDivElement>(null)
    const scrollToBottom = () => {
        console.log('autoscrolling to the bottom')
        bottomElementRef.current?.scrollIntoView({
            behavior: 'instant',
            block: 'end',
            inline: 'nearest',
        })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return { bottomElementRef, scrollToBottom }
}
