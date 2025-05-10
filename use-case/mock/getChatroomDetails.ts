'use server'

import { ChatroomDetail } from '@/types/chat'
import { simulateLatency } from './utils'

interface GetChatroomDetailsPayload {
    chatroomId: string
}

export async function getChatroomDetails(
    payload: GetChatroomDetailsPayload
): Promise<ChatroomDetail> {
    await simulateLatency()

    return {
        chatroomId: payload.chatroomId,
        chatroomName: 'leon',
        currentPage: 8,
        lastMessages: [
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
        ],
        members: [
            {
                publicKey: '123456',
                username: 'haziq',
            },
            {
                publicKey: '73827174',
                username: 'leon',
            },
        ],
    }
}
