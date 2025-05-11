'use server'

import { Message } from '@/types/chat'
import { simulateLatency } from './utils'

interface GetChatroomMessagesPayload {
    chatroomId: string
    page: number
}

export async function getChatroomMessages(
    payload: GetChatroomMessagesPayload
): Promise<Message[]> {
    await simulateLatency()

    return [
        {
            message: 'Hello 123',
            senderUsername: 'leon',
            timestamp: new Date(),
        },
        {
            message: 'Hello 456',
            senderUsername: 'haziq',
            timestamp: new Date(),
        },
        {
            message: 'Hello 789',
            senderUsername: 'leon',
            timestamp: new Date(),
        },
        {
            message: 'Hello 123',
            senderUsername: 'leon',
            timestamp: new Date(),
        },
        {
            message: 'Hello 456',
            senderUsername: 'haziq',
            timestamp: new Date(),
        },
        {
            message: 'Hello 789',
            senderUsername: 'leon',
            timestamp: new Date(),
        },
        {
            message: 'Hello 123',
            senderUsername: 'haziq',
            timestamp: new Date(),
        },
        {
            message: 'Hello 456',
            senderUsername: 'haziq',
            timestamp: new Date(),
        },
        {
            message: 'Hello 789',
            senderUsername: 'haziq',
            timestamp: new Date(),
        },
    ]
}
