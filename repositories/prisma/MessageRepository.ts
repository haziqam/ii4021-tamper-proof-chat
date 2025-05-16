import { prisma } from "./prisma"

import { MessageModel } from "@/models/Message";
import { IMessageRepository } from "../IMessageRepository";

export class MessageRepository implements IMessageRepository {
    async getMessages(chatroomId: string, chunkSequence: number): Promise<MessageModel[]> {
        const result = await prisma.chatPage.findUniqueOrThrow({
            where: {
                chatroomId_pageSequence: {
                    chatroomId: chatroomId,
                    pageSequence: chunkSequence
                }
            },
            select: {
                messages: true
            }
        });
        return result.messages;
    }

    async getLastMessages(chatroomId: string): Promise<{ messages: MessageModel[]; chunkSequence: number; }> {
        const message = await prisma.chatPage.findUniqueOrThrow({
            where: {
                chatroomId_isLastSequence: {
                    chatroomId: chatroomId,
                    isLastSequence: true
                }
            }
        });
        return {
            messages: message.messages,
            chunkSequence: message.pageSequence
        };
    }

    async addMessage(chatroomId: string, message: Omit<MessageModel, "id">, newPage: boolean = false): Promise<MessageModel> {
        if (newPage) {
            const result = await prisma.chatPage.update({
                where: {
                    chatroomId_isLastSequence: {
                        chatroomId: chatroomId,
                        isLastSequence: true
                    }
                },
                data: {
                    messages: {
                        push: message
                    }
                }
            });
            return result.messages.at(-1)!;
        } else {
            const lastPage = await prisma.chatPage.update({
                where: {
                    chatroomId_isLastSequence: {
                        chatroomId: chatroomId,
                        isLastSequence: true
                    }
                },
                data: {
                    isLastSequence: false
                }
            });
            const result = await prisma.chatPage.create({
                data: {
                    pageSequence: lastPage.pageSequence + 1,
                    isLastSequence: true,
                    messages: [message],
                    chatroomId: chatroomId,
                }
            });
            return result.messages.at(-1)!;
        }
    }
}