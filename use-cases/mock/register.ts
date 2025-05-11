'use server'
import { redirect } from 'next/navigation'
import { simulateLatency } from './utils'

interface RegisterPayload {
    username: string
    publicKey: string
    password: string
    confirmPassword: string
}

export async function register(payload: RegisterPayload) {
    await simulateLatency()
    redirect('/login')
}
