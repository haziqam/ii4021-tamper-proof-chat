'use client'
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
// import { useChatStore } from '@/state-stores/chat-store'
import { useChatStore } from '@/state-stores/chat-store-2'
import { Chatroom } from '@/types/chat'
import { logout } from '@/use-cases/logout'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { ChevronUp, LogOut, MessageSquarePlus, User2 } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { MouseEventHandler, startTransition } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

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
                                    <SidebarMenuItem key={chatroom.id}>
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
                                    <SidebarMenuButton className="py-5">
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
                                        className="text-gray-50 cursor-pointer gap-4 text-xl flex px-6 py-3"
                                        style={{ width: DROPDOWN_WIDTH }}
                                    >
                                        <MessageSquarePlus
                                            style={{ transform: 'scale(1.5)' }}
                                        />
                                        <div>New Chat</div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={handleLogout}
                                        className="text-gray-50 cursor-pointer gap-4 text-xl flex px-6 py-3"
                                        style={{ width: DROPDOWN_WIDTH }}
                                    >
                                        <LogOut
                                            style={{ transform: 'scale(1.5)' }}
                                        />
                                        <div>Log out</div>
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
    const params = useParams()
    const chatroomId = params.chatroomId as string

    const userInfo = useUserInfo()
    const isActive = chatroom.id == chatroomId

    if (!userInfo) return null

    const peerUsername = chatroom.members.find(
        (member) => member.username !== userInfo.username
    )?.username

    const lastMessage = chatroom.lastMessage?.message

    return (
        <Card
            className={`${isActive ? 'bg-gray-400' : 'bg-gray-300'} hover:bg-gray-400 rounded-xl cursor-pointer py-3`}
        >
            <Link href={`/chat/${chatroom.id}`}>
                <div className="flex gap-3 px-3 items-center">
                    <Avatar className="w-12 h-12">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-bold text-xl">{peerUsername}</div>
                        <div>{lastMessage}</div>
                    </div>
                </div>
            </Link>
        </Card>
    )
}
