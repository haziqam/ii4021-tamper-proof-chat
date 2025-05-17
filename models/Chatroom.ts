import { ChatPageModel } from "./Message"

export type ChatroomModel = {
    id: string
    members: PublicUserModel[]
    createdAt: Date
    pages?: ChatPageModel[]
}

export type PublicUserModel = {
        username: string
        publicKey: string
    }