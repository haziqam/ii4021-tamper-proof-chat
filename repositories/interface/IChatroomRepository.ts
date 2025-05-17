import { ChatroomModel } from '@/models/Chatroom'

export interface IChatroomRepository {
    create: (userIds: string[]) => Promise<ChatroomModel>
}
