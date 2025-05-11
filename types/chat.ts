import { ECSignature } from './crypto'

export type Chatroom = {
    chatroomId: string
    chatroomName: string
    lastMessage: Message
}

export type Message = {
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
    chatroomId: string
    chatroomName: string
    members: ChatroomMember[]
    lastMessages: Message[]
    currentPage: number
    oldestLoadedPage?: number
}

export type ChatroomMember = {
    username: string
    publicKey: string
}
