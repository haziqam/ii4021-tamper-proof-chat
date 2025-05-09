'use client'

import { Input } from '@/components/ui/input'
import { UserList } from './UserList'
import { User } from '@/types/user'
import { useUserStore } from '@/state-stores/user-store'
import { useEffect } from 'react'
interface UserSearchWrapperProps {
    users: User[]
}

export function UserSearchWrapper(props: UserSearchWrapperProps) {
    const { users } = props
    const initializeUsers = useUserStore((state) => state.initializeUsers)

    useEffect(() => {
        initializeUsers(users)
    }, [])

    return (
        <div>
            <Input />
            <UserList />
        </div>
    )
}
