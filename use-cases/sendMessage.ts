'use server'

import { MessageModel } from '@/models/Message'
import {
    messageRepository,
    userRepository,
} from '@/repositories/prisma/repositories'

interface SendMessagePayload {
    chatroomId: string
    message: Omit<MessageModel, 'id'>
}

export async function sendMessage(payload: SendMessagePayload) {
    const { chatroomId, message } = payload
    const sentMessage = await messageRepository.addMessage(chatroomId, message)

    const receiverUsername = message.receiverUsername
    const receiver = await userRepository.getByUsername(receiverUsername)

    if (!receiver) {
        throw new Error('Invalid receiver')
    }

    await fetch(`${process.env.APP_URL}/notify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...sentMessage,
            receiverId: receiver.id,
            chatroomId: chatroomId,
        }),
    })

    return { sentMessage }
}
