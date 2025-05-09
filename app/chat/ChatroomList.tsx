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
} from '@radix-ui/react-dropdown-menu'

import { ChevronUp, LogOut, MessageSquarePlus, User, User2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { MouseEventHandler, startTransition } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function ChatroomList() {
    const chatrooms = useChatStore((state) => state.chatrooms)
    const router = useRouter()

    const handleLogout: MouseEventHandler<HTMLButtonElement> = () => {
        startTransition(() => {
            return logout()
        })
    }

    const handleNewChat: MouseEventHandler<HTMLButtonElement> = () => {
        router.push('/search')
    }

    const userInfo = useUserInfo()

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
                                    className="w-[calc(var(--sidebar-width)*0.9)] bg-primary rounded-xl"
                                >
                                    <DropdownMenuItem asChild>
                                        <Button
                                            className="w-full flex gap-3 cursor-pointer px-2 py-2 rounded-xl hover:bg-gray-400 focus-visible:outline-none"
                                            onClick={handleNewChat}
                                        >
                                            <MessageSquarePlus />
                                            New Chat
                                        </Button>
                                    </DropdownMenuItem>
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
