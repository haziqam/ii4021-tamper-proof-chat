import { findUsers } from '@/use-case/mock/findUsers'
import { UserSearchWrapper } from './UserSearchWrapper'
import { ReactNode } from 'react'

export default async function SearchLayout({
    children,
}: {
    children: ReactNode
}) {
    const { users, page, totalPage, usersPerPage } = await findUsers({
        page: 1,
        usersPerPage: 10,
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
