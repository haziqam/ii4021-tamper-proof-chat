import { UserModel } from '@/models/User'
import { ChatroomModel } from '@/models/Chatroom'

export interface IUserRepository {
    create: (user: Omit<UserModel, 'id'>) => UserModel
    getById: (id: string) => UserModel | null
    getByUsername: (username: string) => UserModel
    getWithChatrooms: (id: string) => Promise<{
        user: UserModel
        chatrooms: ChatroomModel[]
    }>
    list: (page: number, size: number) => Promise<UserModel[]>
}
