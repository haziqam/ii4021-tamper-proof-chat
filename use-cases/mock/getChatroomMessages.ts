'use server'

import { MessageModel } from '@/models/Message'
import { simulateLatency } from './utils'
import { messageRepository } from './dependencies/repositories'

interface GetChatroomMessagesPayload {
    chatroomId: string
    pageSequence?: number
}

interface GetChatroomMessagesResponse {
    messages: MessageModel[]
    pageSequence: number
}

export async function getChatroomMessages(
    payload: GetChatroomMessagesPayload
): Promise<GetChatroomMessagesResponse> {
    const { chatroomId, pageSequence } = payload
    await simulateLatency()
    if (!pageSequence) {
        const { messages, pageSequence } =
            await messageRepository.getLastMessages(chatroomId)
        return { messages, pageSequence }
    }

    const messages = await messageRepository.getMessages(
        chatroomId,
        pageSequence
    )
    return { messages, pageSequence }
}
