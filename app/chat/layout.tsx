// /app/chat/layout.tsx
import { ReactNode } from 'react'
import { getChatroomList } from '@/use-case/mock/getChatroomList'
import { ChatroomListWrapper } from './ChatroomListWrapper'

export default async function ChatLayout({
    children,
}: {
    children: ReactNode
}) {
    const chatrooms = await getChatroomList()

    return (
        <div className="flex">
            <ChatroomListWrapper chatrooms={chatrooms} />
            {children}
        </div>
    )
}
