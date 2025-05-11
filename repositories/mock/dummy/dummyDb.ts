import { ChatroomModel } from '@/models/Chatroom'
import { MessageChunkModel } from '@/models/Message'
import { UserModel } from '@/models/User'

export let users: UserModel[] = []
export let messageChunks: MessageChunkModel[] = []
export let chatrooms: ChatroomModel[] = []

export const CHUNK_SIZE = 32

export function emptyAll() {
    users = []
    messageChunks = []
    chatrooms = []
}
