export type Chatroom = {
    chatroomId: string
    targetUsername: string
    lastChat: string
}

export type Message = {
    senderUsername: string
    message: string
    timestamp: Date
}

export type ActiveChatroom = {
    chatroomId: string
    targetUsername: string
    messages: Message[]
}
