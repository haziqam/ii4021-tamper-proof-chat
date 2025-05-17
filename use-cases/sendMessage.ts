'use server'

import { MessageModel } from '@/models/Message'
import { messageRepository } from '@/repositories/prisma/repositories'

interface SendMessagePayload {
    chatroomId: string
    message: Omit<MessageModel, 'id'>
}

export async function sendMessage(payload: SendMessagePayload) {
    const { chatroomId, message } = payload
    const sentMessage = await messageRepository.addMessage(chatroomId, message)
    return { sentMessage }
}
