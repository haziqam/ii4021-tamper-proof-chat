import { prisma } from "./prisma"

import { ChatroomModel } from "@/models/Chatroom";
import { IChatroomRepository } from "../IChatroomRepository";
import { MessageRepository } from "./MessageRepository";

export class ChatroomRepository implements IChatroomRepository {
    async create (chatroom: Omit<ChatroomModel, "id">): Promise<ChatroomModel> {
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