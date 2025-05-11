export type ChatroomModel = {
    id: string
    members: {
        username: string
        publicKey: string
    }[]
    lastMessage?: {
        senderUsername: string
        message: string
        sentAt: Date
        chunkSequence: number
    }
    createdAt: Date
}
