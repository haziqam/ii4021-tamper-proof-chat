'use server'

import { Message } from '@/types/chat'
import { simulateLatency } from './utils'

interface GetChatroomMessagesPayload {
    chatroomId: string
    chunkSequence: number
}

export async function getChatroomMessages(
    payload: GetChatroomMessagesPayload
): Promise<Message[]> {
    await simulateLatency()

    return [
        {
            message: 'Hello 123',
            senderUsername: 'leon',
            receiverUsername: 'haziq',
            sentAt: new Date(),
        },
        {
            message: 'Hello 456',
            senderUsername: 'haziq',
            receiverUsername: 'leon',
            sentAt: new Date(),
        },
        {
            message: 'Hello 789',
            senderUsername: 'leon',
            receiverUsername: 'haziq',
            sentAt: new Date(),
        },
        {
            message: 'Hello 123',
            senderUsername: 'leon',
            receiverUsername: 'haziq',
            sentAt: new Date(),
        },
        {
            message: 'Hello 456',
            senderUsername: 'haziq',
            receiverUsername: 'leon',
            sentAt: new Date(),
        },
        {
            message: 'Hello 789',
            senderUsername: 'leon',
            receiverUsername: 'haziq',
            sentAt: new Date(),
        },
        {
            message: 'Hello 123',
            senderUsername: 'haziq',
            receiverUsername: 'leon',
            sentAt: new Date(),
        },
        {
            message: 'Hello 456',
            senderUsername: 'haziq',
            receiverUsername: 'leon',
            sentAt: new Date(),
        },
        {
            message: 'Hello 789',
            senderUsername: 'haziq',
            receiverUsername: 'leon',
            sentAt: new Date(),
        },
    ]
}
