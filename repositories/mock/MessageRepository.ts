import * as dummyDb from './dummy/dummyDb'
import { v4 as uuidv4 } from 'uuid'
import { MessageModel } from '@/models/Message'
import { IMessageRepository } from '../interface/IMessageRepository'

export class MessageRepository implements IMessageRepository {
    async getMessages(
        chatroomId: string,
        pageSequence: number
    ): Promise<MessageModel[]> {
        const chunk = dummyDb.messageChunks.find(
            (c) =>
                c.chatroomId === chatroomId && c.pageSequence === pageSequence
        )
        return chunk?.messages || []
    }

    async getLastMessages(chatroomId: string): Promise<{
        messages: MessageModel[]
        pageSequence: number
    }> {
        const lastChunk = dummyDb.messageChunks
            .filter((c) => c.chatroomId === chatroomId)
            .sort((a, b) => b.pageSequence - a.pageSequence)[0]

        if (!lastChunk) {
            return { messages: [], pageSequence: 1 }
        }

        return {
            messages: lastChunk.messages,
            pageSequence: lastChunk.pageSequence,
        }
    }

    async addMessage(
        chatroomId: string,
        message: Omit<MessageModel, 'id'>
    ): Promise<MessageModel> {
        let lastChunk = dummyDb.messageChunks
            .filter((c) => c.chatroomId === chatroomId)
            .sort((a, b) => b.pageSequence - a.pageSequence)[0]

        // Create new chunk if needed
        if (!lastChunk || lastChunk.messages.length >= dummyDb.CHUNK_SIZE) {
            const newSequence = lastChunk ? lastChunk.pageSequence + 1 : 1
            lastChunk = {
                id: uuidv4(),
                chatroomId,
                pageSequence: newSequence,
                createdAt: new Date(),
                messages: [],
            }
            dummyDb.messageChunks.push(lastChunk)
        }

        const messageWithId = { ...message, id: uuidv4() }
        // Add message
        lastChunk.messages.push(messageWithId)

        // Update chatroom's last message => can be async
        const chatroom = dummyDb.chatrooms.find((c) => c.id === chatroomId)
        if (chatroom) {
            chatroom.lastMessage = {
                senderUsername: message.senderUsername,
                message: message.message,
                sentAt: message.sentAt,
                pageSequence: lastChunk.pageSequence,
            }
        }

        return messageWithId
    }
}
