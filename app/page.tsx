import { getChatroomList } from '@/use-case/mock/getChatroomList'
import { MainLayout } from './MainLayout'

export default async function HomePage() {
    const chatrooms = await getChatroomList()
    return <MainLayout chatrooms={chatrooms} />
}
