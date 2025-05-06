'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { simulateLatency } from './utils'
import { SignJWT } from 'jose'

interface LoginPayload {
    username: string
    password: string
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function login(payload: LoginPayload) {
    await simulateLatency()

    const token = await new SignJWT({ userId: 'abc123' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(secret)

    const cookieStore = await cookies()
    cookieStore.set({
        name: 'access-token',
        value: token,
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24,
    })

    redirect('/')
}
