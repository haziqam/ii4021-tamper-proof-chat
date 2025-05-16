import { UserModel } from '@/models/User'
import { IUserRepository } from '../interface/IUserRepository'
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

    async listUserChatrooms(id: string): Promise<ChatroomModel[]> {
        const user = await this.getById(id)

        console.log('UserRepository::listUserChatrooms::user')
        console.log(user)

        if (!user) return []

        const userChatrooms = dummyDb.chatrooms.filter((c) =>
            user.chatroomIds.includes(c.id)
        )

        console.log('UserRepository::listUserChatrooms::userChatrooms')
        console.log(userChatrooms)

        return userChatrooms
    }

    async list(
        page: number,
        size: number,
        excludeId?: string
    ): Promise<UserModel[]> {
        const start = (page - 1) * size
        return dummyDb.users.slice(start, start + size)
    }
}
