'use client'

import { SidebarFooter } from '@/components/ui/sidebar'
import { UserSearchInput } from './UserSearchInput'
import { UserSearchList } from './UserSearchList'
import { UserSearchPagination } from './UserSearchPagination'

export function UserSearch() {
    return (
        <div className="space-y-3">
            <UserSearchInput />
            <UserSearchList />
            <SidebarFooter>
                <UserSearchPagination />
            </SidebarFooter>
        </div>
    )
}
