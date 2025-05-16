import { JsonValue } from "@/generated/prisma/runtime/library"

export type MessageModel = {
    sender: string
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
