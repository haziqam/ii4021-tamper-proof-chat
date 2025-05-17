'use server'

import { redirect } from 'next/navigation'
import { userRepository } from '@/repositories/prisma/repositories'
import { saltPassword as hashPassword } from './utils'

interface RegisterPayload {
    username: string
    password: string
    confirmPassword: string
    publicKey: string
}

export async function register(payload: RegisterPayload) {
    const { username, password, confirmPassword, publicKey } = payload

    const existingUser = await userRepository.getByUsername(payload.username)

    // TODO: handle error in real implementation
    if (existingUser) {
        throw new Error('Username taken!')
    }

    if (password !== confirmPassword) {
        throw new Error('Password doesn\'t match!')
    }

    const hashedPassword = await hashPassword(password)
    await userRepository.create({
        username,
        password: hashedPassword,
        publicKey,
    })

    redirect('/login')
}
