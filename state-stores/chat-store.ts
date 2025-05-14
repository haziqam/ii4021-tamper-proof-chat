import { create } from 'zustand'
import { Chatroom, ChatroomDetail, Message } from '@/types/chat'
import { getChatroomMessages } from '@/use-cases/mock/getChatroomMessages'

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
        const chatroom = get().chatrooms.find(
            (chatroom) => chatroom.id === chatroomId
        )

        if (!chatroom) return

        const response = await getChatroomMessages({
            chatroomId: chatroomId,
            chunkSequence: 1,
        })

        const messages = response.messages

        set({
            activeChatroom: {
                id: chatroom.id,
                members: chatroom.members,
                lastMessages: messages,
                currentChunkSequence: 1,
                oldestLoadedChunkSequence: 1,
            },
        })
    },

    addNewMessages: async (chatroomId, messages) => {
        const isActive = get().activeChatroom?.id === chatroomId

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

        // set((state) => {
        //     const chatrooms = [...state.chatrooms]
        //     const index = chatrooms.findIndex(
        //         (c) => c.id === chatroomId
        //     )

        //     const lastMessage = messages[messages.length - 1]
        //     if (index !== -1) {
        //         chatrooms[index] = {
        //             ...chatrooms[index],
        //             lastMessage: lastMessage,
        //         }
        //     } else {
        //         chatrooms.push({
        //             chatroomId,
        //             chatroomName: lastMessage.senderUsername,
        //             lastMessage: lastMessage,
        //         })
        //     }

        //     return { chatrooms }
        // })
    },

    loadOldMessages: async (page) => {
        const activeChatroom = get().activeChatroom

        if (!activeChatroom) return

        const response = await getChatroomMessages({
            chatroomId: activeChatroom.id,
            chunkSequence: page,
        })

        const olderMessage = response.messages

        activeChatroom.lastMessages.push(...olderMessage)
        activeChatroom.oldestLoadedChunkSequence =
            activeChatroom.oldestLoadedChunkSequence
                ? activeChatroom.oldestLoadedChunkSequence - 1
                : activeChatroom.currentChunkSequence

        set({ activeChatroom })
    },
}))
