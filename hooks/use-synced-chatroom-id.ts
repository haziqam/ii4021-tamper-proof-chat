'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { useChatStore } from '@/state-stores/chat-store'

/**
 * A custom hook to syncronize activeChatroom state and chatroomId query parameter.
 *
 * Returns:
 *
 * chatroomId, the currently active chatroom id
 *
 * setChatroomId, which sets the activeChatroom state and adjust the chatroomId query parameter at the same time
 */
export function useSyncedChatroomId() {
    const searchParams = useSearchParams()
    const router = useRouter()

    const urlChatroomId = searchParams.get('chatroomId')
    const current = useChatStore((s) => s.activeChatroom?.id)
    const setActive = useChatStore((s) => s.setActiveChatroom)

    // Sync Zustand state from URL param
    useEffect(() => {
        if (urlChatroomId && urlChatroomId !== current) {
            setActive(urlChatroomId)
        }
    }, [urlChatroomId])

    // Sync URL from internal state, debounced to avoid racey updates
    const updateURL = useDebouncedCallback((chatroomId: string) => {
        const newUrl = `/chat?chatroomId=${chatroomId}`
        router.replace(newUrl)
    }, 100)

    const setChatroomId = (chatroomId: string) => {
        setActive(chatroomId)
        updateURL(chatroomId)
    }

    return { chatroomId: urlChatroomId, setChatroomId }
}
