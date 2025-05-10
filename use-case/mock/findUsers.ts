'use server'

import { User } from '@/types/user'
import { dummyUsers } from './dummy/users'
import { simulateLatency } from './utils'

type FindUsersPayload = {
    page: number
    usersPerPage: number
}

export type FindUsersResponse = {
    page: number
    usersPerPage: number
    totalPage: number
    users: User[]
}

export async function findUsers(
    payload: FindUsersPayload
): Promise<FindUsersResponse> {
    await simulateLatency()

    const { page, usersPerPage } = payload
    const totalUsers = dummyUsers.length
    const totalPage = Math.ceil(totalUsers / usersPerPage)
    const start = (page - 1) * usersPerPage
    const end = start + usersPerPage
    const users = dummyUsers.slice(start, end)

    const result = {
        page,
        usersPerPage,
        totalPage,
        users,
    }

    console.log(result)

    return result
}
