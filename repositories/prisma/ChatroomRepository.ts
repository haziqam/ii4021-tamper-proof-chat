import { prisma } from "./prisma"

import { ChatroomModel, PublicUserModel } from "@/models/Chatroom";
import { IChatroomRepository } from "../interface/IChatroomRepository";
import { UserModel } from "@/models/User";

function transformPublicMember(user: UserModel): PublicUserModel {
    return {
        username: user.username,
        publicKey: user.publicKey
    }
}

export class ChatroomRepository implements IChatroomRepository {
    async create(userIds: string[]): Promise<ChatroomModel> {
        return await prisma.$transaction(async (tx) => {
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
        })
    }
}