import { MessageSquarePlus } from 'lucide-react'

export default async function SearchPage() {
    return (
        <div className="w-full h-[100svh] flex justify-center items-center">
            <SearchPagePlaceholder />
        </div>
    )
}

function SearchPagePlaceholder() {
    return (
        <div>
            <MessageSquarePlus size={300} />
            <div className="text-center text-2xl">
                Start a New Conversation!
            </div>
        </div>
    )
}
