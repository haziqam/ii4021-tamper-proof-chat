import { getCookie } from './cookie'

type UserInfo = {
    userId: string
    username: string
}

export function getUserInfo(): UserInfo | null {
    const cookie = getCookie('user-info')
    if (!cookie) {
        return null
    }

    const userInfo = JSON.parse(decodeURIComponent(cookie))

    return userInfo
}
