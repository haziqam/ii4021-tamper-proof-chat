import { create } from 'zustand'
import { Chatroom, ActiveChatroom, Message } from '@/types/chat'
import { getChatroomMessages } from '@/use-case/mock/getChatroomMessages'

interface ChatState {
    chatrooms: Chatroom[]
    activeChatroom: ActiveChatroom | null

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

        const targetUsername = chatroom.targetUsername

        const messages = await getChatroomMessages({
            chatroomId: chatroom.chatroomId,
        })

        set({
            activeChatroom: {
                chatroomId,
                targetUsername,
                messages,
            },
        })
    },

    addMessage: (chatroomId, message) => {
        const isActive = get().activeChatroom?.chatroomId === chatroomId

        if (isActive) {
            set((state) => ({
                activeChatroom: {
                    ...state.activeChatroom!,
                    messages: [...state.activeChatroom!.messages, message],
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
                    targetUsername: message.senderUsername,
                    lastChat: message.message,
                })
            }

            return { chatrooms }
        })
    },
}))
