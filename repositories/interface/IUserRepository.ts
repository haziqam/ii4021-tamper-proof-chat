import { UserModel } from '@/models/User'
import { ChatroomModel } from '@/models/Chatroom'

export interface IUserRepository {
    create: (user: Omit<UserModel, 'id'>) => Promise<UserModel>
    getById: (id: string) => Promise<UserModel | null>
    getByUsername: (username: string) => Promise<UserModel | null>
    list: (
        page: number,
        size: number,
        excludeId?: string
    ) => Promise<UserModel[]>
    listUserChatrooms: (id: string) => Promise<ChatroomModel[]>
}
