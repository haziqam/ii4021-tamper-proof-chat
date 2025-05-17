'use server'
import { redirect } from 'next/navigation'
import { userRepository } from '@/repositories/prisma/repositories'

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
        return
    }

    if (password !== confirmPassword) {
        return
    }

    await userRepository.create({
        username,
        password,
        publicKey,
    })

    redirect('/login')
}
