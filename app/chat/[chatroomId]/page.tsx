import { getChatroomMessages } from '@/use-cases/mock/getChatroomMessages'
import { Chatbox } from './Chatbox'

interface ActiveChatPageProps {
    params: { chatroomId: string }
}

export default async function ActiveChatPage(props: ActiveChatPageProps) {
    const chatroomId = (await props.params).chatroomId
    const { messages, pageSequence } = await getChatroomMessages({ chatroomId })
    return <Chatbox messages={messages} pageSequence={pageSequence} />
}
