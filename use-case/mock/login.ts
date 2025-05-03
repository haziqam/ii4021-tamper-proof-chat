'use server'

import { redirect } from 'next/navigation'
import { simulateLatency } from './utils'

interface LoginPayload {
    username: string
    password: string
}

interface LoginResponse {
    username: string
    userId: string
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
    await simulateLatency()
    redirect('/')
}
