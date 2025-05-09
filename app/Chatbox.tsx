import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { useScrollBottom } from '@/hooks/use-scroll-bottom'
import { useChatStore } from '@/state-stores/chat-store'

export function Chatbox() {
    const activeChatroom = useChatStore((state) => state.activeChatroom)

    return activeChatroom ? (
        <div className="w-full h-svh flex flex-col">
            <ChatboxHeader />
            <ChatboxContent />
            <ChatboxInputText />
        </div>
    ) : (
        'Select a conversation'
    )
}

function ChatboxHeader() {
    const activeChatroom = useChatStore((state) => state.activeChatroom)
    const targetUsername = activeChatroom?.targetUsername

    return (
        <Card>
            <Avatar className="w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>User</AvatarFallback>
            </Avatar>
            <div>{targetUsername}</div>
        </Card>
    )
}

function ChatboxContent() {
    const activeChatroom = useChatStore((state) => state.activeChatroom)
    const messages = activeChatroom?.lastMessages ?? []
    const scrollRef = useScrollBottom(messages)

    return (
        <div
            className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100"
            ref={scrollRef}
        >
            {messages.map((msg, idx) => (
                <div
                    className={`w-full flex ${
                        msg.senderUsername === activeChatroom?.targetUsername
                            ? 'justify-start'
                            : 'justify-end'
                    }`}
                    key={idx}
                >
                    <div className="bg-gray-300 rounded-lg p-2 w-fit max-w-[80%]">
                        <div className="text-sm font-semibold">
                            {msg.senderUsername}
                        </div>
                        <div>{msg.message}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

function ChatboxInputText() {
    return (
        <div className="bg-gray-300 p-4">
            <input
                type="text"
                placeholder="Type a message..."
                className="w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none"
            />
        </div>
    )
}
