import { create } from 'zustand'
import { Chatroom, ChatroomDetail, SignedMessage } from '@/types/chat'
import { getChatroomMessages } from '@/use-cases/getChatroomMessages'
import { sendMessage } from '@/use-cases/sendMessage'

interface ChatState {
    chatrooms: Chatroom[]
    lastMessages: SignedMessage[]
    currentPageSequence: number | null
    oldestLoadedPageSequence: number | null

    // Used for sidebar (after loading up the list of chatrooms)
    setChatrooms: (chatrooms: Chatroom[]) => void

    // Used when sending the message
    sendMessage: (
        chatroomId: string,
        message: Omit<SignedMessage, 'id'>
    ) => Promise<void>

    // Used when receiving event from the websocket
    receiveMessage: (
        chatroomId: string,
        message: SignedMessage,
        isChatroomIdActive: boolean
    ) => Promise<void>

    // Used when opening a chatroom
    initializeLatestMessages: (
        lastMessages: SignedMessage[],
        pageSequence: number
    ) => Promise<void>

    // Used when scrolling to the top (infinite scroll)
    loadOlderMessages: (chatroomId: string) => Promise<void>
}

export const useChatStore = create<ChatState>((set, get) => ({
    chatrooms: [],

    lastMessages: [],

    currentPageSequence: null,

    oldestLoadedPageSequence: null,

    setChatrooms: (chatrooms) => set({ chatrooms }),

    sendMessage: async (chatroomId, message) => {
        const result = await sendMessage({ chatroomId, message })
        const { sentMessage } = result
        const currentLastMessages = get().lastMessages
        set({ lastMessages: [...currentLastMessages, sentMessage] })

        const chatrooms = get().chatrooms

        const updatedChatrooms = chatrooms
            .map((chatroom) => {
                if (chatroom.id !== chatroomId) {
                    return chatroom
                }
                return {
                    ...chatroom,
                    lastMessage: message,
                }
            })
            .toSorted()

        set({ chatrooms: updatedChatrooms })
    },

    receiveMessage: async (
        chatroomId,
        message,
        isChatroomIdActive: boolean
    ) => {
        const currentLastMessages = get().lastMessages
        if (isChatroomIdActive) {
            set({ lastMessages: [...currentLastMessages, message] })
        }

        const chatrooms = get().chatrooms

        const updatedChatrooms = chatrooms
            .map((chatroom) => {
                if (chatroom.id !== chatroomId) {
                    return chatroom
                }
                return {
                    ...chatroom,
                    lastMessage: message,
                }
            })
            .toSorted()

        set({ chatrooms: updatedChatrooms })
    },

    initializeLatestMessages: async (lastMessages, pageSequence) => {
        set({
            lastMessages: lastMessages,
            currentPageSequence: pageSequence,
            oldestLoadedPageSequence: pageSequence,
        })
    },

    loadOlderMessages: async (chatroomId) => {
        const currentChunkSequence = get().currentPageSequence
        const oldestLoadedChunkSequence = get().oldestLoadedPageSequence

        if (!currentChunkSequence || !oldestLoadedChunkSequence) {
            return
        }

        const response = await getChatroomMessages({
            chatroomId: chatroomId,
            pageSequence: oldestLoadedChunkSequence - 1,
        })

        const olderMessage = response.messages

        const lastMessages = [...olderMessage, ...get().lastMessages]

        set({
            lastMessages,
            oldestLoadedPageSequence: oldestLoadedChunkSequence - 1,
        })
    },
}))
