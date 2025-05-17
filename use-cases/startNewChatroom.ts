'use server'

import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { AccessTokenPayload } from '@/middleware'
import { ChatroomModel } from '@/models/Chatroom'
import { chatroomRepository } from '@/repositories/prisma/repositories'

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

interface GetChatroomMessagesPayload {
    targetId: string
}

interface GetChatroomMessagesResponse {
    chatroom: ChatroomModel
}

export async function getChatroomMessages(
    payload: GetChatroomMessagesPayload
): Promise<GetChatroomMessagesResponse> {
    const cookieStore = await cookies()
    const token = cookieStore.get('access-token')?.value!
    const jwtPayload = (await jwtVerify<AccessTokenPayload>(token, secret))
        .payload

    const userId = jwtPayload.userId

    const chatroom = await chatroomRepository.create([userId, payload.targetId])
    return { chatroom }
}
