'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { AccessTokenPayload } from '@/middleware'
import { chatroomRepository } from '@/repositories/prisma/repositories'

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

interface StartChatroomPayload {
    targetId: string
}

export async function startNewChatroom(
    payload: StartChatroomPayload
): Promise<void> {
    const cookieStore = await cookies()
    const token = cookieStore.get('access-token')?.value!
    const jwtPayload = (await jwtVerify<AccessTokenPayload>(token, secret))
        .payload

    const userId = jwtPayload.userId

    const chatroom = await chatroomRepository.create([userId, payload.targetId])

    redirect(`/chat/${chatroom.id}`)
}
