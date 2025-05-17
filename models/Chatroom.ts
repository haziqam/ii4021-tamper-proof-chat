import { MessageModel } from "./Message"

export type ChatroomModel = {
    id: string
    members: PublicUserModel[]
    createdAt: Date
    lastMessage?: MessageModel
}

export type PublicUserModel = {
    username: string
    publicKey: string
}