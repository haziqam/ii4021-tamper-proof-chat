'use client'

import { Input } from '@/components/ui/input'
import { UserList } from './UserList'
import { User } from '@/types/user'
import { useUserStore } from '@/state-stores/user-store'
import {
    ChangeEventHandler,
    MouseEventHandler,
    useEffect,
    useState,
} from 'react'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

interface UserSearchWrapperProps {
    users: User[]
}

export function UserSearchWrapper(props: UserSearchWrapperProps) {
    const { users } = props
    const { initializeUsers, searchUserByUsername } = useUserStore()
    const [usernameInput, setUsernameInput] = useState('')

    useEffect(() => {
        initializeUsers(users)
    }, [])

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setUsernameInput(e.target.value)
    }

    const handleSearch: MouseEventHandler<HTMLButtonElement> = () => {
        searchUserByUsername(usernameInput)
    }

    return (
        <div>
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                    placeholder="Find a user"
                    value={usernameInput}
                    onChange={handleInputChange}
                />
                <Button onClick={handleSearch}>
                    <Search />
                </Button>
            </div>
            <UserList />
        </div>
    )
}
