import { MessageModel } from '@/models/Message'

export interface IMessageRepository {
    getMessages: (
        chatroomId: string,
        chunkSequence: number
    ) => Promise<MessageModel[]>

    getLastMessages: (chatroomId: string) => Promise<{
        messages: MessageModel[]
        chunkSequence: number
    }>

    addMessage: (
        chatroomId: string,
        message: Omit<MessageModel, 'id'>
    ) => Promise<MessageModel>
}
