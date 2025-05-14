'use server'

import { MessageModel } from '@/models/Message'
import { simulateLatency } from './utils'
import { messageRepository } from './dependencies/repositories'

interface GetChatroomMessagesPayload {
    chatroomId: string
    chunkSequence: number
}

interface GetChatroomMessagesResponse {
    messages: MessageModel[]
}

export async function getChatroomMessages(
    payload: GetChatroomMessagesPayload
): Promise<GetChatroomMessagesResponse> {
    const { chatroomId, chunkSequence } = payload
    await simulateLatency()
    const messages = await messageRepository.getMessages(
        chatroomId,
        chunkSequence
    )
    return { messages }
}
