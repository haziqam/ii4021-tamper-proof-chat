import { MessageSquareText } from 'lucide-react'

export default async function ChatPage() {
    return (
        <div className="w-full h-[100svh] flex justify-center items-center">
            <ChatPagePlaceholder />
        </div>
    )
}

function ChatPagePlaceholder() {
    return (
        <div>
            <MessageSquareText size={300} />
            <div className="text-center text-2xl">Select a Conversation!</div>
        </div>
    )
}
