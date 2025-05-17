'use client'

import { User } from '@/types/user'
import { useUserStore } from '@/state-stores/user-store'
import { useEffect } from 'react'

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarProvider,
} from '@/components/ui/sidebar'
import { UserSearch } from './UserSearch'
import { Label } from '@/components/ui/label'

interface UserSearchWrapperProps {
    users: User[]
    page: number
    usersPerPage: number
    totalPage: number
}

export function UserSearchWrapper(props: UserSearchWrapperProps) {
    const { users, page, usersPerPage, totalPage } = props
    const initializeUsers = useUserStore((state) => state.initializeUsers)

    useEffect(() => {
        initializeUsers(users, page, usersPerPage, totalPage)
    }, [])

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>KriptoChat</SidebarHeader>
                <SidebarContent>
                    <SidebarGroup className="overflow-y-hidden">
                        <Label className="p-2">Users</Label>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <UserSearch />
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    )
}
