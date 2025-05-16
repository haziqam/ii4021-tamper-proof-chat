'use server'

import { MessageModel } from '@/models/Message'
import { messageRepository } from './dependencies/repositories'

interface SendMessagePayload {
    chatroomId: string
    message: Omit<MessageModel, 'id'>
}

interface SendMessageResponse {
    sentMessage: MessageModel
}

export async function sendMessage(payload: SendMessagePayload) {
    const { chatroomId, message } = payload
    const sentMessage = await messageRepository.addMessage(chatroomId, message)
    return { sentMessage }
}
