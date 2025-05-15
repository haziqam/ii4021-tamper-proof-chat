'use server'

import { User } from '@/types/user'
import { dummyUsers } from './dummy/users'

type FindUserByUsername = {
    username: string
}

export async function findUserByUsername(
    payload: FindUserByUsername
): Promise<User | null> {
    return dummyUsers.find((u) => u.username === payload.username) ?? null
}
