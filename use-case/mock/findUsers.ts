'use server'

import { User } from '@/types/user'
import { dummyUsers } from './dummy/users'

type FindUsersPayload = {
    limit: number
    offset: number
}

export async function findUsers(payload: FindUsersPayload): Promise<User[]> {
    return dummyUsers.slice(payload.offset, payload.offset + payload.limit)
}
