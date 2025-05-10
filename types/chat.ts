export type Chatroom = {
    chatroomId: string
    chatroomName: string
    lastMessage: Message
}

export type Message = {
    senderUsername: string
    message: string
    timestamp: Date
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
