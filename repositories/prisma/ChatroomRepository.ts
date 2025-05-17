import { prisma } from "./prisma"

import { ChatroomModel } from "@/models/Chatroom";
import { IChatroomRepository } from "../interface/IChatroomRepository";
import { transformPublicMember } from "./transform";

export class ChatroomRepository implements IChatroomRepository {
    async create(userIds: string[]): Promise<ChatroomModel> {
        const chatroom = await prisma.$transaction(async (tx) => {
            const users = await tx.user.findMany({
                where: {
                    id: {
                        in: userIds
                    }
                }
            })
            const newChatroom = await tx.chatroom.create({
                data: {
                    userIds: userIds,
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
            return newChatroom;
        });
        await prisma.chatPage.create({
            data: {
                chatroomId: chatroom.id,
                messageCount: 0,
                messages: []
            }
        });
        return chatroom
    }
}