// UserRepository.ts
import { UserModel } from '@/models/User'
import { IUserRepository } from '../IUserRepository'
import * as dummyDb from './dummy/dummyDb'
import { v4 as uuidv4 } from 'uuid'
import { ChatroomModel } from '@/models/Chatroom'

export class UserRepository implements IUserRepository {
    create(user: Omit<UserModel, 'id' | 'chatroomIds'>): UserModel {
        const newUser: UserModel = {
            ...user,
            id: uuidv4(),
            chatroomIds: [],
        }
        dummyDb.users.push(newUser)
        return newUser
    }

    getById(id: string): UserModel | null {
        return dummyDb.users.find((u) => u.id === id) || null
    }

    getByUsername(username: string): UserModel {
        const user = dummyDb.users.find((u) => u.username === username)
        if (!user) throw new Error('User not found')
        return user
    }

    async getWithChatrooms(id: string): Promise<{
        user: UserModel
        chatrooms: ChatroomModel[]
    }> {
        const user = this.getById(id)
        if (!user) throw new Error('User not found')

        const userChatrooms = dummyDb.chatrooms.filter((c) =>
            user.chatroomIds.includes(c.id)
        )

        return { user, chatrooms: userChatrooms }
    }

    async list(page: number, size: number): Promise<UserModel[]> {
        const start = (page - 1) * size
        return dummyDb.users.slice(start, start + size)
    }
}
