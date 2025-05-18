import { prisma } from "./prisma"

import { ChatroomModel } from "@/models/Chatroom";
import { IChatroomRepository } from "../interface/IChatroomRepository";
import { transformPublicMember } from "./transform";

export class ChatroomRepository implements IChatroomRepository {
    async create(userIds: string[]): Promise<ChatroomModel> {
        const sortedIds = userIds.sort()
        const chatroom = await prisma.$transaction(async (tx) => {
            const existingChatroom = await tx.chatroom.findUnique({
                where: {
                    userIds: sortedIds
                }
            })
            if (existingChatroom !== null) {
                return existingChatroom
            }
            const users = await tx.user.findMany({
                where: {
                    id: {
                        in: userIds
                    }
                }
            })
            const newChatroom = await tx.chatroom.create({
                data: {
                    userIds: sortedIds,
                    members: users.map(transformPublicMember).sort()
                }
            });
            await tx.user.updateMany({
                where: {
                    id: {
                        in: userIds
                    }
                },
                data: {
                    chatroomIds: {
                        push: newChatroom.id
                    }
                }
            })
            await tx.chatPage.create({
                data: {
                    chatroomId: newChatroom.id,
                    messageCount: 0,
                    messages: []
                }
            })
            return newChatroom;
        });
        return chatroom
    }
}