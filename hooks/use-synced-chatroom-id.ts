'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { useChatStore } from '@/state-stores/chat-store'

/**
 * A custom hook to synchronize activeChatroom state and chatroomId query parameter.
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
    // Track if we've already triggered the initial sync
    const hasInitiatedSync = useRef(false)

    const urlChatroomId = searchParams.get('chatroomId')
    const current = useChatStore((s) => s.activeChatroom?.id)
    const setActive = useChatStore((s) => s.setActiveChatroom)

    // Sync Zustand state from URL param - only once
    useEffect(() => {
        // Only run this effect if:
        // 1. We have a URL chatroom ID
        // 2. We haven't already triggered a sync with this same ID
        if (urlChatroomId && !hasInitiatedSync.current) {
            console.log('Initial sync from URL to store', { urlChatroomId })

            // Mark that we've initiated a sync to prevent additional calls
            hasInitiatedSync.current = true

            // Trigger the store update
            setActive(urlChatroomId)
        }
    }, [urlChatroomId, setActive])

    // Sync URL from internal state, debounced to avoid racey updates
    const updateURL = useDebouncedCallback((chatroomId: string) => {
        if (chatroomId && chatroomId !== urlChatroomId) {
            const newUrl = `/chat?chatroomId=${chatroomId}`
            router.replace(newUrl)
        }
    }, 100)

    // Handle manual chatroom ID changes
    const setChatroomId = (chatroomId: string) => {
        if (chatroomId === current) {
            return
        }

        setActive(chatroomId)
        updateURL(chatroomId)
    }

    return { chatroomId: urlChatroomId, setChatroomId }
}
