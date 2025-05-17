import { prisma } from "./prisma"

import { MessageModel } from "@/models/Message";
import { IMessageRepository } from "../interface/IMessageRepository";
import { Prisma } from "@/generated/prisma";
import { transformMessages } from "./transform";

const MAX_MESSAGE_PER_PAGE = 32

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
            const lastPage = await tx.chatPage.findUniqueOrThrow({
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
            let newPage = false;
            // append message to existing page if not full
            let updateQuery: Prisma.ChatPageUpdateArgs = {
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
            if (lastPage!.messageCount + 1 === MAX_MESSAGE_PER_PAGE) {
                updateQuery.data.isLastSequence = false;
                newPage = true;
            }
            const chatPage = await tx.chatPage.update(updateQuery);
            if (newPage) { // if no page exist yet or previous page is full, create new page
                await tx.chatPage.create({
                    data: {
                        pageSequence: lastPage.pageSequence + 1,
                        isLastSequence: true,
                        messageCount: 0,
                        messages: [],
                        chatroomId: chatroomId,
                    }
                });
            }
            return transformMessages(chatPage.id, chatPage.messages).at(-1)!;
        })
    }
}