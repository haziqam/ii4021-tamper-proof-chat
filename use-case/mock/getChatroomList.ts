'use server'

import { Chatroom } from '@/types/chat'
import { simulateLatency } from './utils'

export async function getChatroomList(): Promise<Chatroom[]> {
    await simulateLatency()
    return [
        {
            chatroomId: '123',
            chatroomName: 'leon',
            lastMessage: {
                message: 'Hello 789',
                senderUsername: 'leon',
                timestamp: new Date(),
            },
        },
        {
            chatroomId: '456',
            chatroomName: 'abcde',
            lastMessage: {
                message: 'Hello 789',
                senderUsername: 'leon',
                timestamp: new Date(),
            },
        },
        {
            chatroomId: '113',
            chatroomName: 'efghi',
            lastMessage: {
                message: 'Hello 789',
                senderUsername: 'leon',
                timestamp: new Date(),
            },
        },
    ]
}
