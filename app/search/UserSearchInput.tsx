'use client'

import { Input } from '@/components/ui/input'
import { useUserStore } from '@/state-stores/user-store'
import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export function UserSearchInput() {
    const [usernameInput, setUsernameInput] = useState('')
    const { searchUserByUsername, searchUsers } = useUserStore()

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setUsernameInput(e.target.value)
    }

    const handleSearch = () => {
        const trimmed = usernameInput.trim()
        if (trimmed !== '') {
            searchUserByUsername(trimmed)
        } else {
            searchUsers(1, 10)
        }
    }

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }
    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
                placeholder="Find a user by username"
                value={usernameInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <Button onClick={handleSearch}>
                <Search />
            </Button>
        </div>
    )
}
