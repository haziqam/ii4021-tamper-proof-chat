export type ChatroomModel = {
    id: string
    members: {
        username: string
        publicKey: string
    }[]
    createdAt: Date
}
