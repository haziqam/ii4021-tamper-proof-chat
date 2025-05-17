'use server'

import { User } from '@/types/user'
import { userRepository } from '@/repositories/prisma/repositories'

type FindUserByUsername = {
    username: string
}

export async function findUserByUsername(
    payload: FindUserByUsername
): Promise<User | null> {
    return userRepository.getByUsername(payload.username)
}
