import { findUsers } from '@/use-case/mock/findUsers'
import { UserSearchWrapper } from './UserSearchWrapper'

export default async function SearchPage() {
    const users = await findUsers({
        limit: 10,
        offset: 0,
    })
    return <UserSearchWrapper users={users} />
}
