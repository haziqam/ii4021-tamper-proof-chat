'use client'

import { useScrollBottom } from '@/hooks/use-scroll-bottom'
import { useChatStore } from '@/state-stores/chat-store'
import { useUserInfo } from '@/hooks/user-info-store'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react'

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
    const userInfo = useUserInfo()

    if (!userInfo || !activeChatroom) return null

    const peerUsername = activeChatroom.members.find(
        (member) => member.username !== userInfo.username
    )?.username

    return (
        <Card className="bg-gray-300 px-5 py-4 rounded-b-xl rounded-t-none ">
            <div className="w-full flex gap-5 items-center">
                <Avatar className="w-15 h-15">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>User</AvatarFallback>
                </Avatar>
                <div className="font-extrabold text-2xl">{peerUsername}</div>
            </div>
        </Card>
    )
}

function ChatboxContent() {
    const activeChatroom = useChatStore((state) => state.activeChatroom)
    const messages = activeChatroom?.lastMessages ?? []
    const scrollRef = useScrollBottom(messages)
    const userInfo = useUserInfo()

    return (
        <div
            className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100"
            ref={scrollRef}
        >
            {messages.map((msg, idx) => (
                <div
                    className={`w-full flex ${
                        msg.senderUsername === userInfo?.username
                            ? 'justify-end'
                            : 'justify-start'
                    }`}
                    key={`${'messages' + msg.sentAt + '-' + idx}`}
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
    const addNewMessages = useChatStore((state) => state.addNewMessages)

    const activeChatroom = useChatStore((state) => state.activeChatroom)
    const activeChatroomId = activeChatroom?.id
    const [messageInput, setMessageInput] = useState('')
    const userInfo = useUserInfo()

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setMessageInput(e.target.value)
    }

    const handleSend = async () => {
        if (!userInfo || !activeChatroomId) return
        const trimmed = messageInput.trim()
        if (trimmed === '') return
        await addNewMessages(activeChatroomId, [
            {
                message: trimmed,
                senderUsername: userInfo.username,
                sentAt: new Date(),
            },
        ])
        setMessageInput('')
    }

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            handleSend()
        }
    }

    return (
        <div className="flex items-center space-x-2 p-4">
            <Input
                className="flex-1"
                type="text"
                placeholder="Type a message..."
                value={messageInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <Button onClick={handleSend}>
                <Send />
            </Button>
        </div>
    )
}
