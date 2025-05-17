import { prisma } from "./prisma"

import { MessageModel } from "@/models/Message";
import { IMessageRepository } from "../interface/IMessageRepository";
import { Prisma } from "@/generated/prisma";

type message = {
    senderUsername: string;
    receiverUsername: string;
    message: string;
    sentAt: Date;
    messageHash: string;
    signature: {
        r: string;
        s: string;
    };
}

function transformMessage(pageId: string, message: message, index: number): MessageModel {
    return {
        id: `${pageId}-${index}`,
        senderUsername: message.senderUsername,
        receiverUsername: message.receiverUsername,
        message: message.message,
        sentAt: message.sentAt,
        messageHash: message.messageHash,
        signature: message.signature
    }
}

function transformMessages(pageId: string, message: message[]): MessageModel[] {
        return message.map(transformMessage.bind(null, pageId))
    }

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
                id: true,
                messages: true
            }
        });
        return transformMessages(result.id, result.messages);
    }

    async getLastMessages(chatroomId: string): Promise<{ messages: MessageModel[]; pageSequence: number; }> {
        let chatPage = await prisma.chatPage.findUniqueOrThrow({
            where: {
                chatroomId_isLastSequence: {
                    chatroomId: chatroomId,
                    isLastSequence: true
                }
            },
            select: {
                id: true,
                messages: true,
                pageSequence: true
            }
        });
        const transformedMessages = transformMessages(chatPage.id, chatPage.messages)
        return {messages: transformedMessages, pageSequence: chatPage.pageSequence};
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
            return transformMessages(result.id, result.messages).at(-1)!;
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
            return transformMessages(result.id, result.messages).at(-1)!;
        }
    }
}