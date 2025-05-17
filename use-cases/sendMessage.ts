'use server'

import { MessageModel } from '@/models/Message'
import {
    chatroomRepository,
    messageRepository,
    userRepository,
} from '@/repositories/prisma/repositories'
import { io } from '@/socket/index'

interface SendMessagePayload {
    chatroomId: string
    message: Omit<MessageModel, 'id'>
}

export async function sendMessage(payload: SendMessagePayload) {
    const { chatroomId, message } = payload
    const sentMessage = await messageRepository.addMessage(chatroomId, message)

    const receiverUsername = message.receiverUsername
    const receiver = await userRepository.getByUsername(receiverUsername)

    io.to(receiver!.id).emit('message', message)
    return { sentMessage }
}
