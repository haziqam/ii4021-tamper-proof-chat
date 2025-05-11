import { MessageModel } from '@/models/Message'

export interface IMessageRepository {
    getMessages: (chatroomId: string, chunkSequence: number) => MessageModel[]
    addMessage: (
        chatroomId: string,
        message: Omit<MessageModel, 'id'>
    ) => MessageModel
}
