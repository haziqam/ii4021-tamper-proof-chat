'use client'
import { Button } from '@/components/ui/button'
import {
    Sidebar,
    SidebarProvider,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarHeader,
} from '@/components/ui/sidebar'
import { useChatStore } from '@/state-stores/chat-store'
import { Chatroom } from '@/types/chat'
import { logout } from '@/use-case/mock/logout'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'

import { ChevronUp, LogOut, User, User2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { MouseEventHandler } from 'react'

export function ChatroomList() {
    const chatrooms = useChatStore((state) => state.chatrooms)

    const handleLogout: MouseEventHandler<HTMLButtonElement> = () => {
        logout()
    }

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>KriptoChat</SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Conversations</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {chatrooms.map((chatroom) => (
                                    <SidebarMenuItem key={chatroom.chatroomId}>
                                        <SidebarMenuButton asChild>
                                            <ChatroomItem chatroom={chatroom} />
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton className="px-2 py-2">
                                        <User2 /> Username
                                        <ChevronUp className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    side="top"
                                    className="w-[calc(var(--sidebar-width)*0.9)] bg-gray-300 rounded-xl"
                                >
                                    <DropdownMenuItem asChild>
                                        <Button
                                            className="w-full flex gap-3 cursor-pointer px-2 py-2 rounded-xl hover:bg-gray-400 focus-visible:outline-none"
                                            onClick={handleLogout}
                                        >
                                            <LogOut />
                                            Log out
                                        </Button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
        </SidebarProvider>
    )
}

interface ChatroomItemProps {
    chatroom: Chatroom
}

function ChatroomItem(props: ChatroomItemProps) {
    const { chatroom } = props
    const router = useRouter()
    const activeChatroom = useChatStore((s) => s.activeChatroom)
    const setActiveChatroom = useChatStore((s) => s.setActiveChatroom)
    const isActive = chatroom.chatroomId === activeChatroom?.chatroomId

    const handleClick: MouseEventHandler<HTMLDivElement> = () => {
        setActiveChatroom(chatroom.chatroomId)
        const url = new URL(window.location.href)
        url.searchParams.set('chatroomId', chatroom.chatroomId)
        router.push(url.toString())
    }

    return (
        <div
            className={`flex gap-3 px-3 py-3 ${isActive ? 'bg-gray-400' : 'bg-gray-300'} hover:bg-gray-400 rounded-xl cursor-pointer`}
            onClick={handleClick}
        >
            <div className="rounded-full bg-gray-600 p-1">
                <User />
            </div>
            <div>
                <div className="font-bold">{chatroom.chatroomName}</div>
                <div className="text-xs">{chatroom.lastChat}</div>
            </div>
        </div>
    )
}
