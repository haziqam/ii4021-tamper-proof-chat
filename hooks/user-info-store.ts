import { useEffect, useState } from 'react'
import { getCookie } from '../state-stores/cookie'

type UserInfo = {
    userId: string
    username: string
}

export function useUserInfo(): UserInfo | null {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

    useEffect(() => {
        const cookie = getCookie('user-info')
        if (!cookie) return

        try {
            const parsed = JSON.parse(decodeURIComponent(cookie))
            setUserInfo(parsed)
        } catch (err) {
            console.error('Failed to parse user-info cookie:', err)
        }
    }, [])

    return userInfo
}
