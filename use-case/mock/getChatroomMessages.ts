'use server'

import { Message } from '@/types/chat'
import { simulateLatency } from './utils'

interface GetChatroomMessagesPayload {
    chatroomId: string
}

export async function getChatroomMessages(
    payload: GetChatroomMessagesPayload
): Promise<Message[]> {
    await simulateLatency()

    return [
        {
            message: 'Hello 123',
            senderUsername: 'my_username',
            timestamp: new Date(),
        },
        {
            message: 'Hello 456',
            senderUsername: 'haziq',
            timestamp: new Date(),
        },
        {
            message: 'Hello 789',
            senderUsername: 'my_username',
            timestamp: new Date(),
        },
    ]
}
