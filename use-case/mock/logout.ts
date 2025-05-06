'use server'

import { cookies } from 'next/headers'
import { simulateLatency } from './utils'
import { redirect } from 'next/navigation'

export async function logout() {
    await simulateLatency()
    const cookieStore = await cookies()
    cookieStore.set('access-token', '', {
        path: '/',
        maxAge: 0,
    })
    redirect('/login')
}
