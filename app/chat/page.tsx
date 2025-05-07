import { getChatroomList } from '@/use-case/mock/getChatroomList'
import { ChatLayout } from './ChatLayout'

export default async function ChatPage() {
    const chatrooms = await getChatroomList()
    return <ChatLayout chatrooms={chatrooms} />
}
