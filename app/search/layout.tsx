import { findUsers } from '@/use-case/mock/findUsers'
import { UserSearchWrapper } from './UserSearchWrapper'
import { ReactNode } from 'react'
import { USERS_PER_PAGE } from './constants'

export default async function SearchLayout({
    children,
}: {
    children: ReactNode
}) {
    const { users, page, totalPage, usersPerPage } = await findUsers({
        page: 1,
        usersPerPage: USERS_PER_PAGE,
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
