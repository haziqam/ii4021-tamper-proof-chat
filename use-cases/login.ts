'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { SignJWT } from 'jose'
import { userRepository } from '@/repositories/prisma/repositories'
import { comparePassword } from './utils'

interface LoginPayload {
    username: string
    password: string
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function login(payload: LoginPayload) {
    const user = await userRepository.getByUsername(payload.username)

    // TODO: handle error in real implementation
    if (!user) {
        throw new Error('User not found')
    }

    // TODO: check with hash + salt in the real implementation and throw/return error if not match
    if (!(await comparePassword(payload.password, user.password))) {
        throw new Error('Passwords not match')
    }

    const cookieStore = await cookies()

    const token = await new SignJWT({ userId: user.id })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(secret)

    cookieStore.set({
        name: 'access-token',
        value: token,
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24,
    })

    const userInfo = {
        userId: user.id,
        username: user.username,
        publicKey: user.publicKey,
    }

    cookieStore.set('user-info', JSON.stringify(userInfo), {
        httpOnly: false,
        path: '/',
        maxAge: 60 * 60 * 24,
    })

    redirect('/')
}
