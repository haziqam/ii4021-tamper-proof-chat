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
                members: users.map(transformPublicMember)
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