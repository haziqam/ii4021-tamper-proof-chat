import { MessageModel } from '@/models/Message'

export interface IMessageRepository {
    getMessages: (
        chatroomId: string,
        chunkSequence: number
    ) => Promise<MessageModel[]>
    addMessage: (
        chatroomId: string,
        message: Omit<MessageModel, 'id'>
    ) => Promise<MessageModel>
}
