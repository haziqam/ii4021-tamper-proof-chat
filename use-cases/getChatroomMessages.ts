'use server'

import { MessageModel } from '@/models/Message'
import { messageRepository } from '@/repositories/prisma/repositories'

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
    if (pageSequence === undefined) {
        const { messages, pageSequence } =
            await messageRepository.getLastMessages(chatroomId)
        return { messages, pageSequence }
    }

    const messages = await messageRepository.getMessages(
        chatroomId,
        pageSequence
    )

    console.log(`get messages: ${payload.pageSequence}, ${pageSequence}`)
    return { messages, pageSequence }
}
