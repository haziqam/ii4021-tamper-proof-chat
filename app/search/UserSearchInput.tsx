'use client'

import { Input } from '@/components/ui/input'
import { useUserStore } from '@/state-stores/user-store'
import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Home, Search } from 'lucide-react'
import { DEFAULT_USERS_PER_PAGE } from './constants'
import Link from 'next/link'

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
            searchUsers(1, DEFAULT_USERS_PER_PAGE)
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
            <Link href="/chat">
                <Button>
                    <Home />
                </Button>
            </Link>
        </div>
    )
}
