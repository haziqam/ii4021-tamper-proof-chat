import { useChatStore } from '@/state-stores/chat-store'

export function Chatbox() {
    const activeChatroom = useChatStore((state) => state.activeChatroom)
    return <div>Active Chatroom: {JSON.stringify(activeChatroom)}</div>
}
