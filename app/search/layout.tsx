import { findUsers } from '@/use-cases/mock/findUsers'
import { UserSearchWrapper } from './UserSearchWrapper'
import { ReactNode } from 'react'
import { DEFAULT_USERS_PER_PAGE } from './constants'

export default async function SearchLayout({
    children,
}: {
    children: ReactNode
}) {
    const { users, page, totalPage, usersPerPage } = await findUsers({
        page: 1,
        usersPerPage: DEFAULT_USERS_PER_PAGE,
    })

    return (
        <div className="flex">
            <UserSearchWrapper
                users={users}
                page={page}
                totalPage={totalPage}
                usersPerPage={usersPerPage}
            />
            {children}
        </div>
    )
}
