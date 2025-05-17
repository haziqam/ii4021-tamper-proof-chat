'use client'

import { useParams } from 'next/navigation'
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
    Ref,
    useEffect,
    useRef,
    useState,
} from 'react'
import { signMessage } from '@/use-cases/signMessage'
import { SignedMessage } from '@/types/chat'
import { getPrivateKey } from '@/private-key-store/opfs'
import { verifySignedMessage } from '@/use-cases/verifyMessage'

interface ChatboxProps {
    messages: SignedMessage[]
    pageSequence: number
}

export function Chatbox(props: ChatboxProps) {
    const initializeLastMessages = useChatStore(
        (state) => state.initializeLatestMessages
    )

    useEffect(() => {
        initializeLastMessages(props.messages, props.pageSequence)
    }, [props])

    return (
        <div className="w-full h-svh flex flex-col">
            <ChatboxHeader />
            <ChatboxContent />
            <ChatboxInputText />
        </div>
    )
}

function ChatboxHeader() {
    const params = useParams()
    const chatroomId = params.chatroomId as string

    const chatrooms = useChatStore((state) => state.chatrooms)
    const activeChatroom = chatrooms.find(
        (chatroom) => chatroom.id === chatroomId
    )
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
    const params = useParams()
    const chatroomId = params.chatroomId as string
    const { lastMessages, oldestLoadedPageSequence, loadOlderMessages } =
        useChatStore()
    const { bottomElementRef, prevFirstMessageRef, prevFirstMessageSentAt } =
        useScrollBottom(lastMessages)
    const userInfo = useUserInfo()

    const containerRef = useRef<HTMLDivElement | null>(null)
    const firstMessageRef = useRef<HTMLDivElement | null>(null)
    const [loading, setLoading] = useState(false)

    const handleLoadOlderMessages = async () => {
        if (
            (oldestLoadedPageSequence && oldestLoadedPageSequence <= 0) ||
            loading
        )
            return
        setLoading(true)
        await loadOlderMessages(chatroomId)
        setLoading(false)
    }

    const mapMessageToMessageBubble = (msg: SignedMessage, idx: number) => {
        const isFirst = idx === 0
        const isLast = idx === lastMessages.length - 1
        const isPrevFirst = msg.sentAt === prevFirstMessageSentAt
        const messageType: 'sentMessage' | 'receivedMessage' =
            msg.senderUsername === userInfo?.username
                ? 'sentMessage'
                : 'receivedMessage'
        const ref: Ref<HTMLDivElement> = (el) => {
            if (isFirst) firstMessageRef.current = el
            if (isPrevFirst) prevFirstMessageRef.current = el
            if (isLast) bottomElementRef.current = el
        }
        const key = `${'messages' + msg.sentAt + '-' + idx}`

        if (messageType == 'sentMessage') {
            return <SentMessageBubble message={msg} key={key} ref={ref} />
        }

        return <ReceivedMessageBubble message={msg} key={key} ref={ref} />
    }

    return (
        <div className="relative flex-1 bg-gray-100 overflow-hidden">
            <div
                ref={containerRef}
                className="h-full overflow-y-auto px-4 py-6 space-y-2"
            >
                {oldestLoadedPageSequence && oldestLoadedPageSequence > 0 ? (
                    <div className="w-full flex justify-center pb-2">
                        <button
                            onClick={handleLoadOlderMessages}
                            disabled={loading}
                            className="px-4 py-1 text-sm font-medium text-white bg-blue-500 rounded shadow hover:bg-blue-600 disabled:opacity-50"
                        >
                            {loading ? 'Loading...' : 'Load older messages'}
                        </button>
                    </div>
                ) : null}

                {lastMessages.map(mapMessageToMessageBubble)}
            </div>
        </div>
    )
}

interface MessageBubbleProps {
    message: SignedMessage
    ref: Ref<HTMLDivElement>
}

function SentMessageBubble(props: MessageBubbleProps) {
    const { message, ref } = props
    return (
        <div className="w-full flex justify-end" ref={ref}>
            <div className="bg-gray-300 rounded-lg p-2 w-fit max-w-[80%]">
                <div className="text-sm font-semibold">
                    {message.senderUsername}
                </div>
                <div>{message.message}</div>
            </div>
        </div>
    )
}

function ReceivedMessageBubble(props: MessageBubbleProps) {
    const { message, ref } = props

    const params = useParams()
    const chatroomId = params.chatroomId as string

    const chatrooms = useChatStore((state) => state.chatrooms)
    const activeChatroom = chatrooms.find(
        (chatroom) => chatroom.id === chatroomId
    )

    const userInfo = useUserInfo()
    const peerPublicKey = activeChatroom?.members.find(
        (member) => member.username !== userInfo?.username
    )?.publicKey

    if (!peerPublicKey) return

    const isVerified = verifySignedMessage(message, peerPublicKey)

    return (
        <div>
            <div className="w-full flex justify-start" ref={ref}>
                <div className="bg-gray-300 rounded-lg p-2 w-fit max-w-[80%]">
                    <div>
                        <div className="text-sm font-semibold">
                            {message.senderUsername}
                        </div>
                        <div>{message.message}</div>
                    </div>
                </div>
            </div>
            <div>Sent at: {message.sentAt.toLocaleString()}</div>
            <div>Verified: {isVerified ? 'true' : 'false'}</div>
        </div>
    )
}

function ChatboxInputText() {
    const params = useParams()
    const chatroomId = params.chatroomId as string

    const { chatrooms, sendMessage } = useChatStore()
    const activeChatroom = chatrooms.find(
        (chatroom) => chatroom.id === chatroomId
    )

    const userInfo = useUserInfo()

    const [messageInput, setMessageInput] = useState('')

    if (!userInfo || !activeChatroom) return null

    const peerUsername = activeChatroom.members.find(
        (member) => member.username !== userInfo.username
    )?.username!

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setMessageInput(e.target.value)
    }

    const handleSend = async () => {
        if (!userInfo || !chatroomId) return
        const trimmed = messageInput.trim()
        if (trimmed === '') return

        const message = {
            message: trimmed,
            senderUsername: userInfo.username,
            receiverUsername: peerUsername,
            sentAt: new Date(),
        }

        const privateKey = await getPrivateKey(userInfo.username)

        if (!privateKey) {
            console.error('Private key not found')
            return
        }

        const signedMessage = signMessage(message, privateKey)
        await sendMessage(chatroomId, signedMessage)
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
