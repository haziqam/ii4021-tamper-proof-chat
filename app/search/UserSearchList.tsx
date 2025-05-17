'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { useUserStore } from '@/state-stores/user-store'
import { User } from '@/types/user'
import { MouseEventHandler } from 'react'

export function UserSearchList() {
    const users = useUserStore((state) => state.users)

    return (
        <div className="space-y-2 h-183 overflow-y-auto">
            {users.map((user, idx) => (
                <UserListItem
                    user={user}
                    key={`${'userlist' + user.id + '-' + idx}`}
                />
            ))}
        </div>
    )
}

interface UserListItemProps {
    user: User
}

function UserListItem(props: UserListItemProps) {
    const { user } = props

    const handleClick: MouseEventHandler<HTMLDivElement> = () => {
        console.log('Im clicked')
    }

    return (
        <Card
            className={`bg-gray-300 hover:bg-gray-400 rounded-xl cursor-pointer py-3`}
            onClick={handleClick}
        >
            <div className="flex gap-3 px-3 items-center">
                <Avatar className="w-12 h-12">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>User</AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-bold text-xl">{user.username}</div>
                </div>
            </div>
        </Card>
    )
}
