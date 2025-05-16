import { MessageModel } from '@/models/Message'

export interface IMessageRepository {
    getMessages: (
        chatroomId: string,
        pageSequence: number
    ) => Promise<MessageModel[]>

    getLastMessages: (chatroomId: string) => Promise<{
        messages: MessageModel[]
        pageSequence: number
    }>

    addMessage: (
        chatroomId: string,
        message: Omit<MessageModel, 'id'>
    ) => Promise<MessageModel>
}
