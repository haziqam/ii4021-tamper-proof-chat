import { Card } from '@/components/ui/card'
import { useUserStore } from '@/state-stores/user-store'
import { User } from '@/types/user'

export function UserList() {
    const users = useUserStore((state) => state.users)

    return <div>{JSON.stringify(users)}</div>
}

interface UserListItemProps {
    user: User
}

function UserListItem(props: UserListItemProps) {
    return <Card></Card>
}
