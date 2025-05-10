import { create } from 'zustand'
import { User } from '@/types/user'
import { findUserByUsername } from '@/use-case/mock/findUserByUsername'
import { findUsers } from '@/use-case/mock/findUsers'

interface UsersState {
    users: User[]
    page: number
    usersPerPage: number
    totalPage: number
    initializeUsers: (
        users: User[],
        page: number,
        usersPerPage: number,
        totalPage: number
    ) => void
    searchUserByUsername: (username: string) => Promise<void>
    searchUsers: (page: number, usersPerPage: number) => Promise<void>
}

export const useUserStore = create<UsersState>((set, get) => ({
    users: [],

    page: 1,

    usersPerPage: 10,

    totalPage: 0,

    initializeUsers: (users, page, usersPerPage, totalPage) => {
        set({ users, page, usersPerPage, totalPage })
    },

    searchUserByUsername: async (username) => {
        let user =
            get().users.find((user) => user.username === username) ?? null

        if (user) {
            set({ users: [user], page: 1, usersPerPage: 1, totalPage: 1 })
            return
        }

        user = await findUserByUsername({ username })
        if (user) {
            set({ users: [user], page: 1, usersPerPage: 1, totalPage: 1 })
            return
        }

        set({ users: [], page: 1, usersPerPage: 0, totalPage: 1 })
    },

    searchUsers: async (page, usersPerPage) => {
        const response = await findUsers({ page, usersPerPage })

        set({
            users: response.users,
            page: response.page,
            totalPage: response.totalPage,
            usersPerPage: response.usersPerPage,
        })
    },
}))
