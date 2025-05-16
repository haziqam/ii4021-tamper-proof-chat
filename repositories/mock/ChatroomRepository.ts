import { ChatroomModel } from '@/models/Chatroom'
import * as dummyDb from './dummy/dummyDb'
import { v4 as uuidv4 } from 'uuid'
import { IChatroomRepository } from '../interface/IChatroomRepository'
import { MessageChunkModel } from '@/models/Message'

export class ChatroomRepository implements IChatroomRepository {
    async create(
        chatroom: Omit<ChatroomModel, 'id' | 'createdAt'>
    ): Promise<ChatroomModel> {
        const newChatroom: ChatroomModel = {
            ...chatroom,
            id: uuidv4(),
            createdAt: new Date(),
        }
        dummyDb.chatrooms.push(newChatroom)
        this.createNewChunk(newChatroom.id)
        return newChatroom
    }

    private createNewChunk(chatroomId: string): MessageChunkModel {
        const newChunk: MessageChunkModel = {
            id: uuidv4(),
            chatroomId,
            chunkSequence: this.getNextChunkSequence(chatroomId),
            createdAt: new Date(),
            messages: [],
        }
        dummyDb.messageChunks.push(newChunk)
        return newChunk
    }

    private getNextChunkSequence(chatroomId: string): number {
        const lastChunk = [...dummyDb.messageChunks]
            .filter((c) => c.chatroomId === chatroomId)
            .sort((a, b) => b.chunkSequence - a.chunkSequence)[0]

        return lastChunk ? lastChunk.chunkSequence + 1 : 1
    }

    getLastChunk(chatroomId: string) {
        return [...dummyDb.messageChunks]
            .filter((c) => c.chatroomId === chatroomId)
            .sort((a, b) => b.chunkSequence - a.chunkSequence)[0]
    }
}
