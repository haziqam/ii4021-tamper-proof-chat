import { create } from 'zustand'
import { Chatroom, ChatroomDetail, SignedMessage } from '@/types/chat'
import { getChatroomMessages } from '@/use-cases/mock/getChatroomMessages'

interface ChatState {
    chatrooms: Chatroom[]
    activeChatroom: ChatroomDetail | null

    setChatrooms: (chatrooms: Chatroom[]) => void
    setActiveChatroom: (chatroomId: string) => Promise<void>
    addNewMessages: (
        chatroomId: string,
        messages: SignedMessage[]
    ) => Promise<void>
    loadOlderMessages: () => Promise<void>
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
        })

        const { messages, chunkSequence } = response

        set({
            activeChatroom: {
                id: chatroom.id,
                members: chatroom.members,
                lastMessages: messages,
                currentChunkSequence: chunkSequence,
                oldestLoadedChunkSequence: chunkSequence,
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
        //     const index = chatrooms.findIndex((c) => c.id === chatroomId)

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

    loadOlderMessages: async () => {
        const activeChatroom = get().activeChatroom

        if (!activeChatroom) return

        const response = await getChatroomMessages({
            chatroomId: activeChatroom.id,
            chunkSequence: activeChatroom.oldestLoadedChunkSequence - 1,
        })

        const olderMessage = response.messages

        activeChatroom.lastMessages = [
            ...olderMessage,
            ...activeChatroom.lastMessages,
        ]

        activeChatroom.oldestLoadedChunkSequence--

        set({ activeChatroom })
    },
}))
