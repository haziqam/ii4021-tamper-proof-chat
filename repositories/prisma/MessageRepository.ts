import { prisma } from "./prisma"

import { MessageModel, ChatPageModel } from "@/models/Message";
import { IMessageRepository } from "../interface/IMessageRepository";
import { Prisma } from "@/generated/prisma";

const MAX_MESSAGE_PER_PAGE = 32

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
    async getMessages(chatroomId: string, pageSequence: number): Promise<MessageModel[]> {
        const result = await prisma.chatPage.findUniqueOrThrow({
            where: {
                chatroomId_pageSequence: {
                    chatroomId: chatroomId,
                    pageSequence: pageSequence
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
        const chatPage = await prisma.chatPage.findUniqueOrThrow({
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
        return { messages: transformedMessages, pageSequence: chatPage.pageSequence };
    }

    async addMessage(chatroomId: string, message: Omit<MessageModel, "id">): Promise<MessageModel> {
        return await prisma.$transaction(async (tx) => {
            const lastPage = await tx.chatPage.findUnique({
                where: {
                    chatroomId_isLastSequence: {
                        chatroomId: chatroomId,
                        isLastSequence: true
                    }
                },
                select: {
                    pageSequence: true,
                    messageCount: true
                }
            });
            // append message to existing page if exist or not full
            if (lastPage ? (lastPage.messageCount < MAX_MESSAGE_PER_PAGE) : false) {
                const updateQuery: Prisma.ChatPageUpdateArgs = {
                    where: {
                        chatroomId_isLastSequence: {
                            chatroomId: chatroomId,
                            isLastSequence: true
                        }
                    },
                    data: {
                        messageCount: {
                            increment: 1
                        },
                        messages: {
                            push: message
                        }
                    }
                };
                const result = await tx.chatPage.update(updateQuery);
                return transformMessages(result.id, result.messages).at(-1)!;
            } else { // if no page exist yet or previous page is full, create new page
                const newPageSequence = lastPage ? (lastPage.messageCount + 1) : 0

                const result = await tx.chatPage.create({
                    data: {
                        pageSequence: newPageSequence,
                        isLastSequence: true,
                        messageCount: 1,
                        messages: [message],
                        chatroomId: chatroomId,
                    }
                });
                return transformMessages(result.id, result.messages).at(-1)!;
            }
        })
    }
}