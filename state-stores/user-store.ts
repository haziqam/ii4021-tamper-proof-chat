import { create } from 'zustand'
import { User } from '@/types/user'
import { findUserByUsername } from '@/use-case/mock/findUserByUsername'

interface UsersState {
    users: User[]
    initializeUsers: (users: User[]) => void
    searchUserByUsername: (username: string) => Promise<void>
}

export const useUserStore = create<UsersState>((set, get) => ({
    users: [],
    initializeUsers: (users) => {
        set({ users })
    },
    searchUserByUsername: async (username) => {
        let user =
            get().users.find((user) => user.username === username) ?? null

        if (user) {
            set({ users: [user] })
            return
        }

        user = await findUserByUsername({ username })
        if (user) {
            set({ users: [user] })
            return
        }

        set({ users: [] })
    },
}))
