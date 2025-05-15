'use server'

import { MessageModel } from '@/models/Message'
import { simulateLatency } from './utils'
import { messageRepository } from './dependencies/repositories'

interface GetChatroomMessagesPayload {
    chatroomId: string
    chunkSequence?: number
}

interface GetChatroomMessagesResponse {
    messages: MessageModel[]
    chunkSequence: number
}

export async function getChatroomMessages(
    payload: GetChatroomMessagesPayload
): Promise<GetChatroomMessagesResponse> {
    const { chatroomId, chunkSequence } = payload
    await simulateLatency()
    if (!chunkSequence) {
        const { messages, chunkSequence } =
            await messageRepository.getLastMessages(chatroomId)
        return { messages, chunkSequence }
    }

    const messages = await messageRepository.getMessages(
        chatroomId,
        chunkSequence
    )
    return { messages, chunkSequence }
}
