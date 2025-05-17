import { ECSignature } from './crypto'

export type Chatroom = {
    id: string
    members: ChatroomMember[]
    lastMessage?: {
        senderUsername: string
        message: string
        sentAt: Date
    }
    createdAt: Date
}

export type Message = {
    id: string
    senderUsername: string
    receiverUsername: string
    message: string
    sentAt: Date
}

export type SignedMessage = Message & {
    messageHash: string
    signature: ECSignature
}

export type ChatroomDetail = {
    id: string
    members: ChatroomMember[]
    lastMessages: SignedMessage[]
    currentChunkSequence: number
    oldestLoadedChunkSequence: number
}

export type ChatroomMember = {
    username: string
    publicKey: string
}
