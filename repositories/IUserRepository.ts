import { UserModel } from '@/models/User'
import { ChatroomModel } from '@/models/Chatroom'

export interface IUserRepository {
    create: (user: Omit<UserModel, 'id'>) => Promise<UserModel>
    getById: (id: string) => Promise<UserModel | null>
    getByUsername: (username: string) => Promise<UserModel>
    getWithChatrooms: (id: string) => Promise<{
        user: UserModel
        chatrooms: ChatroomModel[]
    }>
    list: (page: number, size: number) => Promise<UserModel[]>
}
