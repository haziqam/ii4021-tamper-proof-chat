import { Message } from '@/types/chat'
import { useEffect, useRef, useState } from 'react'
import { usePrevious } from './use-previous'

export function useScrollBottom(messages: Message[]) {
    const prevMessages = usePrevious(messages)
    const bottomElementRef = useRef<HTMLDivElement>(null)
    const prevFirstMessageRef = useRef<HTMLDivElement>(null)
    const [prevFirstMessageSentAt, setPrevFirstMessageSentAt] =
        useState<Date | null>(null)
    const [initialScrollDone, setInitialScrollDone] = useState(false)

    const scrollToBottom = (behavior: ScrollBehavior = 'instant') => {
        bottomElementRef.current?.scrollIntoView({
            behavior,
            block: 'end',
        })
    }

    const scrollToPrevFirstMessage = () => {
        prevFirstMessageRef.current?.scrollIntoView({
            behavior: 'auto',
            block: 'end',
        })
    }

    useEffect(() => {
        if (!messages.length) return

        const isInitial = !initialScrollDone
        const isOlderMessagesLoaded =
            prevMessages &&
            messages.length > prevMessages.length &&
            prevMessages[prevMessages.length - 1]?.sentAt ===
                messages[messages.length - 1]?.sentAt

        const isNewMessageAdded =
            prevMessages &&
            messages[messages.length - 1]?.sentAt !==
                prevMessages[prevMessages.length - 1]?.sentAt

        if (isInitial) {
            scrollToBottom('instant')
            setInitialScrollDone(true)
        } else if (isOlderMessagesLoaded && prevMessages?.[0]) {
            setPrevFirstMessageSentAt(prevMessages[0].sentAt)
        } else if (isNewMessageAdded) {
            scrollToBottom('smooth')
        }
    }, [messages])

    useEffect(() => {
        if (prevFirstMessageSentAt) {
            scrollToPrevFirstMessage()
            setPrevFirstMessageSentAt(null)
        }
    }, [prevFirstMessageSentAt])

    return {
        bottomElementRef,
        prevFirstMessageRef,
        prevFirstMessageSentAt,
    }
}
