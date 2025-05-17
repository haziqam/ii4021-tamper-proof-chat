export type MessageModel = {
    id: string
    senderUsername: string
    receiverUsername: string
    message: string
    sentAt: Date
    messageHash: string
    signature: {
        r: string
        s: string
    }
}

export type ChatPageModel = {
    id: string
    chatroomId: string
    pageSequence: number // local to chatroomId
    messages: MessageModel[]
}
