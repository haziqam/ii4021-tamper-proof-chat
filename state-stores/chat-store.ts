import { create } from 'zustand'
import { Chatroom, ChatroomDetail, Message } from '@/types/chat'
import { getChatroomMessages } from '@/use-case/mock/getChatroomMessages'

interface ChatState {
    chatrooms: Chatroom[]
    activeChatroom: ChatroomDetail | null

    setChatrooms: (chatrooms: Chatroom[]) => void
    setActiveChatroom: (chatroomId: string) => void
    addMessage: (chatroomId: string, message: Message) => void
}

export const useChatStore = create<ChatState>((set, get) => ({
    chatrooms: [],
    activeChatroom: null,

    setChatrooms: (chatrooms) => set({ chatrooms }),

    setActiveChatroom: async (chatroomId) => {
        const chatroom = get().chatrooms.find(
            (c) => c.chatroomId === chatroomId
        )

        if (!chatroom) return

        const targetUsername = chatroom.chatroomName

        const messages = await getChatroomMessages({
            chatroomId: chatroom.chatroomId,
        })

        set({
            activeChatroom: {
                chatroomId,
                targetUsername,
                lastMessages: messages,
            },
        })
    },

    addMessage: (chatroomId, message) => {
        const isActive = get().activeChatroom?.chatroomId === chatroomId

        if (isActive) {
            set((state) => ({
                activeChatroom: {
                    ...state.activeChatroom!,
                    lastMessages: [
                        ...state.activeChatroom!.lastMessages,
                        message,
                    ],
                },
            }))
        }

        set((state) => {
            const chatrooms = [...state.chatrooms]
            const index = chatrooms.findIndex(
                (c) => c.chatroomId === chatroomId
            )

            if (index !== -1) {
                chatrooms[index] = {
                    ...chatrooms[index],
                    lastChat: message.message,
                }
            } else {
                chatrooms.push({
                    chatroomId,
                    chatroomName: message.senderUsername,
                    lastChat: message.message,
                })
            }

            return { chatrooms }
        })
    },
}))
