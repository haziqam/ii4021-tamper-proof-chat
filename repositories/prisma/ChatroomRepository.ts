import { prisma } from "./prisma"

import { ChatroomModel } from "@/models/Chatroom";
import { IChatroomRepository } from "../interface/IChatroomRepository";
import { use } from "react";

export class ChatroomRepository implements IChatroomRepository {
    async create(userIds: string[]): Promise<ChatroomModel> {
        const users = await prisma.user.findMany({
            where: {
                id: {
                    in: userIds
                }
            }
        })
        const newChatroom = await prisma.chatroom.create({
            data: {
                userIds: userIds,
                members: users
            }
        });
        await prisma.chatPage.create({
            data: {
                pageSequence: 0,
                isLastSequence: true,
                messages: [],
                chatroomId: newChatroom.id,
            }
        });
        await prisma.user.updateMany({
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
    }
}