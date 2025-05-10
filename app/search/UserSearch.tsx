'use client'

import { UserSearchInput } from './UserSearchInput'
import { UserSearchList } from './UserSearchList'
import { UserSearchPagination } from './UserSearchPagination'

export function UserSearch() {
    return (
        <div className="space-y-3">
            <UserSearchInput />
            <UserSearchList />
            <UserSearchPagination />
        </div>
    )
}
