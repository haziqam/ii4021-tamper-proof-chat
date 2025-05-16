import { prisma } from "./prisma"

import { ChatroomModel } from "@/models/Chatroom";
import { UserModel } from "@/models/User";
import { IUserRepository } from "../interface/IUserRepository";

export class UserRepository implements IUserRepository {
    async create(user: Omit<UserModel, "id">): Promise<UserModel> {
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
        return await prisma.user.findFirst({
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
        if (lastMessage) {
            return await prisma.chatroom.findMany({
                include: {
                    pages: {
                        where: {
                            isLastSequence: true
                        }
                    }
                },
                where: {
                    userIds: {
                        has: id
                    }
                }
            });
        } else {
            return await prisma.chatroom.findMany({
                where: {
                    userIds: {
                        has: id
                    }
                }
            });
        }
    }
}