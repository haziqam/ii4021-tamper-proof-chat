'use server'

import { User } from '@/types/user'
import { userRepository } from '@/repositories/prisma/repositories'

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

    const { page, usersPerPage } = payload
    const [totalUsers, users] = await Promise.all([userRepository.countUsers(), userRepository.list(page, usersPerPage)])

    const totalPage = Math.ceil(totalUsers / usersPerPage)

    return {
        page: payload.page,
        usersPerPage: payload.usersPerPage,
        totalPage: totalPage,
        users: users
    }
}

export async function usersCount() {
    return await userRepository.countUsers()
}
