import * as dummyDb from './dummy/dummyDb'
import { v4 as uuidv4 } from 'uuid'
import { MessageModel } from '@/models/Message'
import { IMessageRepository } from '../IMessageRepository'

export class MessageRepository implements IMessageRepository {
    async getMessages(
        chatroomId: string,
        chunkSequence: number
    ): Promise<MessageModel[]> {
        const chunk = dummyDb.messageChunks.find(
            (c) =>
                c.chatroomId === chatroomId && c.chunkSequence === chunkSequence
        )
        return chunk?.messages || []
    }

    async getLastMessages(chatroomId: string): Promise<{
        messages: MessageModel[]
        chunkSequence: number
    }> {
        const lastChunk = dummyDb.messageChunks
            .filter((c) => c.chatroomId === chatroomId)
            .sort((a, b) => b.chunkSequence - a.chunkSequence)[0]

        if (!lastChunk) {
            return { messages: [], chunkSequence: 1 }
        }

        return {
            messages: lastChunk.messages,
            chunkSequence: lastChunk.chunkSequence,
        }
    }

    async addMessage(
        chatroomId: string,
        message: Omit<MessageModel, 'id'>
    ): Promise<MessageModel> {
        let lastChunk = dummyDb.messageChunks
            .filter((c) => c.chatroomId === chatroomId)
            .sort((a, b) => b.chunkSequence - a.chunkSequence)[0]

        // Create new chunk if needed
        if (!lastChunk || lastChunk.messages.length >= dummyDb.CHUNK_SIZE) {
            const newSequence = lastChunk ? lastChunk.chunkSequence + 1 : 1
            lastChunk = {
                id: uuidv4(),
                chatroomId,
                chunkSequence: newSequence,
                createdAt: new Date(),
                messages: [],
            }
            dummyDb.messageChunks.push(lastChunk)
        }

        // Add message
        lastChunk.messages.push(message)

        // Update chatroom's last message => can be async
        const chatroom = dummyDb.chatrooms.find((c) => c.id === chatroomId)
        if (chatroom) {
            chatroom.lastMessage = {
                senderUsername: message.senderUsername,
                message: message.message,
                sentAt: message.sentAt,
                chunkSequence: lastChunk.chunkSequence,
            }
        }

        return message
    }
}
