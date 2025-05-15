import { ChatroomModel } from '@/models/Chatroom'

export interface IChatroomRepository {
    create: (chatroom: Omit<ChatroomModel, 'id'>) => Promise<ChatroomModel>
}
