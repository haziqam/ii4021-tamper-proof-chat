export type MessageModel = {
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

export type MessageChunkModel = {
    id: string
    chatroomId: string
    chunkSequence: number // local to chatroomId
    createdAt: Date
    messages: MessageModel[]
}
