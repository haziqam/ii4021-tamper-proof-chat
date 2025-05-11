import { UserModel } from '@/models/User'
import { IUserRepository } from '../IUserRepository'
import * as dummyDb from './dummy/dummyDb'
import { v4 as uuidv4 } from 'uuid'
import { ChatroomModel } from '@/models/Chatroom'

export class UserRepository implements IUserRepository {
    async create(
        user: Omit<UserModel, 'id' | 'chatroomIds'>
    ): Promise<UserModel> {
        const newUser: UserModel = {
            ...user,
            id: uuidv4(),
            chatroomIds: [],
        }
        dummyDb.users.push(newUser)

        return newUser
    }

    async getById(id: string): Promise<UserModel | null> {
        return dummyDb.users.find((u) => u.id === id) ?? null
    }

    async getByUsername(username: string): Promise<UserModel | null> {
        const user = dummyDb.users.find((u) => u.username === username) ?? null
        return user
    }

    async getWithChatrooms(id: string): Promise<{
        user: UserModel
        chatrooms: ChatroomModel[]
    } | null> {
        const user = await this.getById(id)
        if (!user) return null

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
