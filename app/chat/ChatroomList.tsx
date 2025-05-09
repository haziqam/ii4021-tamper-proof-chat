'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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
    SIDEBAR_WIDTH,
} from '@/components/ui/sidebar'
import { useSyncedChatroomId } from '@/hooks/use-synced-chatroom-id'
import { useUserInfo } from '@/hooks/user-info-store'
import { useChatStore } from '@/state-stores/chat-store'
import { Chatroom } from '@/types/chat'
import { logout } from '@/use-case/mock/logout'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { ChevronUp, LogOut, MessageSquarePlus, User, User2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { MouseEventHandler, startTransition } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function ChatroomList() {
    const chatrooms = useChatStore((state) => state.chatrooms)
    const router = useRouter()

    const handleLogout: MouseEventHandler<HTMLDivElement> = () => {
        startTransition(() => {
            return logout()
        })
    }

    const handleNewChat: MouseEventHandler<HTMLDivElement> = () => {
        router.push('/search')
    }

    const userInfo = useUserInfo()

    const DROPDOWN_WIDTH_PERCENTAGE = 0.8
    const DROPDOWN_WIDTH =
        parseInt(SIDEBAR_WIDTH.replace('rem', ''), 10) *
            DROPDOWN_WIDTH_PERCENTAGE +
        'rem'

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
                                        <User2 />{' '}
                                        {userInfo?.username ?? 'Username'}
                                        <ChevronUp className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    side="top"
                                    className="bg-primary rounded-xl"
                                >
                                    <DropdownMenuItem
                                        onClick={handleNewChat}
                                        className={`text-gray-50 cursor-pointer gap-2`}
                                        style={{ width: DROPDOWN_WIDTH }}
                                    >
                                        <MessageSquarePlus className="h-4 w-4" />
                                        <span>New Chat</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={handleLogout}
                                        className={`text-gray-50 cursor-pointer gap-2`}
                                        style={{ width: DROPDOWN_WIDTH }}
                                    >
                                        <LogOut className="h-4 w-4" />
                                        <span>Log out</span>
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
    const { chatroomId, setChatroomId } = useSyncedChatroomId()
    const isActive = chatroom.chatroomId == chatroomId

    const handleClick: MouseEventHandler<HTMLDivElement> = () => {
        setChatroomId(chatroom.chatroomId)
    }

    return (
        <Card
            className={`${isActive ? 'bg-gray-400' : 'bg-gray-300'} hover:bg-gray-400 rounded-xl cursor-pointer py-3`}
            onClick={handleClick}
        >
            <div className="flex gap-3 px-3">
                <Avatar className="w-10 h-10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>User</AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-bold">{chatroom.chatroomName}</div>
                    <div className="text-xs">{chatroom.lastChat}</div>
                </div>
            </div>
        </Card>
    )
}
