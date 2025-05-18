'use server'

import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { AccessTokenPayload } from '@/jwt/access-token'
import { userRepository } from '@/repositories/prisma/repositories'
import { ChatroomModel } from '@/models/Chatroom'

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

interface GetChatroomListResponse {
    chatroomList: ChatroomModel[]
}

export async function getChatroomList(): Promise<GetChatroomListResponse> {
    const cookieStore = await cookies()
    const token = cookieStore.get('access-token')?.value!
    const jwtPayload = (await jwtVerify<AccessTokenPayload>(token, secret))
        .payload

    const userId = jwtPayload.userId
    const chatroomList = await userRepository.listUserChatrooms(userId)
    return { chatroomList }
}
