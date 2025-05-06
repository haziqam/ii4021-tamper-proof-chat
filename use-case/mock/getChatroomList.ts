'use server'

import { Chatroom } from '@/types/chat'
import { simulateLatency } from './utils'

export async function getChatroomList(): Promise<Chatroom[]> {
    await simulateLatency()
    return [
        {
            chatroomId: '123',
            targetUsername: 'leon',
            lastChat: 'Hello',
        },
        {
            chatroomId: '456',
            targetUsername: 'abcde',
            lastChat: 'Hello',
        },
        {
            chatroomId: '113',
            targetUsername: 'efghi',
            lastChat: 'Hello',
        },
    ]
}
