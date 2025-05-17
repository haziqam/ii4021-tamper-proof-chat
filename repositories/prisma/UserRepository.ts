import { prisma } from "./prisma"

import { ChatroomModel } from "@/models/Chatroom";
import { UserModel } from "@/models/User";
import { IUserRepository } from "../interface/IUserRepository";
import { joinChatroomWithLastMessages } from "./transform";

export class UserRepository implements IUserRepository {
    async create(user: Omit<UserModel, "id" | "chatroomIds">): Promise<UserModel> {
        return await prisma.user.create({
            data: user
        });
    }
    async getById(id: string): Promise<UserModel | null> {
        return await prisma.user.findUniqueOrThrow({
            where: {
                id: id
            }
        });
    }
    async getByUsername(username: string): Promise<UserModel | null> {
        return await prisma.user.findUnique({
            where: {
                username: username
            }
        });
    }
    async list(page: number, size: number): Promise<UserModel[]> {
        return await prisma.user.findMany({
            take: size,
            skip: (page - 1) * size
        });
    }
    async listUserChatrooms(id: string, lastMessage: boolean = true): Promise<ChatroomModel[]> {
        const { chatrooms, lastPages } = await prisma.$transaction(async (tx) => {
            const chatrooms: ChatroomModel[] = await tx.chatroom.findMany({
                where: {
                    userIds: {
                        has: id
                    }
                }
            });
            const chatroomIds = chatrooms.map((value) => { return value.id })
            const lastPages = await tx.chatPage.findMany({
                where: {
                    chatroomId: {
                        in: chatroomIds
                    },
                    isLastSequence: true
                },
                select: {
                    id: true,
                    chatroomId: true,
                    messages: true
                }
            });

            return { chatrooms, lastPages };
        });

        return joinChatroomWithLastMessages(chatrooms, lastPages)
    }

    async countUsers(): Promise<number> {
        return prisma.user.count();
    }
}