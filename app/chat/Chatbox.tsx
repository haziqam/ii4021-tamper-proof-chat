'use client'

import { useScrollBottom } from '@/hooks/use-scroll-bottom'
import { useChatStore } from '@/state-stores/chat-store'
import { useUserInfo } from '@/hooks/user-info-store'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import {
    ChangeEventHandler,
    KeyboardEventHandler,
    useEffect,
    useRef,
    useState,
} from 'react'
import { signMessage } from '@/use-cases/signMessage'

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
    const { activeChatroom, loadOlderMessages } = useChatStore()
    const messages = activeChatroom?.lastMessages ?? []
    const { bottomElementRef, scrollToBottom } = useScrollBottom(messages)
    const userInfo = useUserInfo()

    const firstMessageRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!firstMessageRef.current) return

        const observer = new IntersectionObserver(
            async ([entry]) => {
                if (!entry.isIntersecting) return
                if (activeChatroom?.oldestLoadedChunkSequence === 1) return
                await loadOlderMessages()
            },
            {
                root: null, // viewport
                threshold: 0.1, // adjust if needed
            }
        )

        observer.observe(firstMessageRef.current)

        return () => {
            observer.disconnect()
        }
    }, [activeChatroom])

    return (
        <div className="flex-1 p-4 space-y-2 bg-gray-100 overflow-y-auto">
            {messages.map((msg, idx) => (
                <div
                    className={`w-full flex ${
                        msg.senderUsername === userInfo?.username
                            ? 'justify-end'
                            : 'justify-start'
                    }`}
                    key={`${'messages' + msg.sentAt + '-' + idx}`}
                    ref={
                        idx === 0
                            ? firstMessageRef
                            : idx === messages.length - 1
                              ? bottomElementRef
                              : null
                    }
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

    if (!userInfo || !activeChatroom) return null

    const peerUsername = activeChatroom.members.find(
        (member) => member.username !== userInfo.username
    )?.username!

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setMessageInput(e.target.value)
    }

    const handleSend = async () => {
        if (!userInfo || !activeChatroomId) return
        const trimmed = messageInput.trim()
        if (trimmed === '') return

        const message = {
            message: trimmed,
            senderUsername: userInfo.username,
            receiverUsername: peerUsername,
            sentAt: new Date(),
        }

        const signedMessage = signMessage(message, 'PRIVATE_KEY') // Nanti diubah

        await addNewMessages(activeChatroomId, [signedMessage])
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
