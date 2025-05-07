export type Chatroom = {
    chatroomId: string
    chatroomName: string
    lastChat: string
}

export type Message = {
    senderUsername: string
    message: string
    timestamp: Date
}

export type ChatroomDetail = {
    chatroomId: string
    targetUsername: string
    members?: ChatroomMember[]
    lastMessages: Message[]
}

export type ChatroomMember = {
    username: string
    publicKey: string
}
