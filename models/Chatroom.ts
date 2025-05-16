import { ChatPageModel } from "./Message"

export type ChatroomModel = {
    id: string
    members: {
        username: string
        publicKey: string
    }[]
    createdAt: Date
    pages?: ChatPageModel[]
}
