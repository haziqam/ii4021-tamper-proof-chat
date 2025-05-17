import { ReactNode } from 'react'
import { getChatroomList } from '@/use-cases/getChatroomList'
import { ChatroomListWrapper } from './ChatroomListWrapper'

export default async function ChatLayout({
    children,
}: {
    children: ReactNode
}) {
    const { chatroomList } = await getChatroomList()

    return (
        <div className="flex">
            <ChatroomListWrapper chatrooms={chatroomList} />
            {children}
        </div>
    )
}
