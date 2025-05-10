import { create } from 'zustand'
import { Chatroom, ChatroomDetail, Message } from '@/types/chat'
import { getChatroomMessages } from '@/use-case/mock/getChatroomMessages'
import { getChatroomDetails } from '@/use-case/mock/getChatroomDetails'

interface ChatState {
    chatrooms: Chatroom[]
    activeChatroom: ChatroomDetail | null

    setChatrooms: (chatrooms: Chatroom[]) => void
    setActiveChatroom: (chatroomId: string) => Promise<void>
    addNewMessages: (chatroomId: string, messages: Message[]) => Promise<void>
    loadOldMessages: (page: number) => Promise<void>
}

export const useChatStore = create<ChatState>((set, get) => ({
    chatrooms: [],

    activeChatroom: null,

    setChatrooms: (chatrooms) => set({ chatrooms }),

    setActiveChatroom: async (chatroomId) => {
        const chatroom = await getChatroomDetails({ chatroomId })
        set({
            activeChatroom: {
                ...chatroom,
                oldestLoadedPage: chatroom.currentPage,
            },
        })
    },

    addNewMessages: async (chatroomId, messages) => {
        const isActive = get().activeChatroom?.chatroomId === chatroomId

        if (isActive) {
            set((state) => ({
                activeChatroom: {
                    ...state.activeChatroom!,
                    lastMessages: [
                        ...state.activeChatroom!.lastMessages,
                        ...messages,
                    ],
                },
            }))
        }

        set((state) => {
            const chatrooms = [...state.chatrooms]
            const index = chatrooms.findIndex(
                (c) => c.chatroomId === chatroomId
            )

            const lastMessage = messages[messages.length - 1]
            if (index !== -1) {
                chatrooms[index] = {
                    ...chatrooms[index],
                    lastMessage: lastMessage,
                }
            } else {
                chatrooms.push({
                    chatroomId,
                    chatroomName: lastMessage.senderUsername,
                    lastMessage: lastMessage,
                })
            }

            return { chatrooms }
        })
    },

    loadOldMessages: async (page) => {
        const activeChatroom = get().activeChatroom

        if (!activeChatroom) return

        const olderMessage = await getChatroomMessages({
            chatroomId: activeChatroom.chatroomId,
            page: page,
        })

        activeChatroom.lastMessages.push(...olderMessage)
        activeChatroom.oldestLoadedPage = activeChatroom.oldestLoadedPage
            ? activeChatroom.oldestLoadedPage - 1
            : activeChatroom.currentPage

        set({ activeChatroom })
    },
}))
