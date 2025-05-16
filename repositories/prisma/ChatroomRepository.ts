import { prisma } from "./prisma"

import { ChatroomModel } from "@/models/Chatroom";
import { IChatroomRepository } from "../interface/IChatroomRepository";

export class ChatroomRepository implements IChatroomRepository {
    async create(chatroom: Omit<ChatroomModel, "id" | "pages">): Promise<ChatroomModel> {
        const newChatroom = await prisma.chatroom.create({
            data: chatroom
        });
        await prisma.chatPage.create({
            data: {
                pageSequence: 0,
                isLastSequence: true,
                messages: [],
                chatroomId: newChatroom.id,
            }
        });
        return newChatroom;
    }
}