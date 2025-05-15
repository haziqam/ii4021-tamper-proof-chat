'use server'
import { redirect } from 'next/navigation'
import { simulateLatency } from './utils'
import { userRepository } from './dependencies/repositories'

interface RegisterPayload {
    username: string
    password: string
    confirmPassword: string
    publicKey: string
}

export async function register(payload: RegisterPayload) {
    await simulateLatency()
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
