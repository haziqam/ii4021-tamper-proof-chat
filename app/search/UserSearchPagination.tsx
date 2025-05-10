'use client'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import { useUserStore } from '@/state-stores/user-store'
import { USERS_PER_PAGE } from './constants'

export function UserSearchPagination() {
    const { page: activePage, totalPage, searchUsers } = useUserStore()

    const handlePageChange = (page: number) => {
        searchUsers(page, USERS_PER_PAGE)
    }

    const handleClick = (page: number) => {
        handlePageChange(page)
    }

    const handlePrevious = () => {
        if (activePage > 1) {
            handlePageChange(activePage - 1)
        }
    }

    const handleNext = () => {
        if (activePage < totalPage) {
            handlePageChange(activePage + 1)
        }
    }

    const getPageNumbers = () => {
        const pageNumbers = []

        // Always show first page
        pageNumbers.push(1)

        // Handle ellipsis and surrounding pages
        if (activePage > 3) {
            pageNumbers.push('ellipsis-start')
        }

        // Pages around the current page
        for (
            let i = Math.max(2, activePage - 1);
            i <= Math.min(totalPage - 1, activePage + 1);
            i++
        ) {
            if (i > 1 && i < totalPage) {
                pageNumbers.push(i)
            }
        }

        // Handle ellipsis after current pages
        if (activePage < totalPage - 2) {
            pageNumbers.push('ellipsis-end')
        }

        // Always show last page
        if (totalPage > 1) {
            pageNumbers.push(totalPage)
        }

        return pageNumbers
    }

    return (
        <Pagination
            style={{
                transform: 'scale(0.8)',
            }}
        >
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            handlePrevious()
                        }}
                        className={
                            activePage === 1
                                ? 'pointer-events-none opacity-50'
                                : ''
                        }
                    />
                </PaginationItem>

                {getPageNumbers().map((item, index) => {
                    // If this is an ellipsis
                    if (typeof item === 'string') {
                        return (
                            item.includes('ellipsis') && (
                                <PaginationItem key={item}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )
                        )
                    }

                    // If this is a regular page number
                    return (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleClick(item)
                                }}
                                className={`${
                                    activePage === item
                                        ? 'bg-primary text-white'
                                        : ''
                                }`}
                                aria-current={
                                    activePage === item ? 'page' : undefined
                                }
                            >
                                {item}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            handleNext()
                        }}
                        className={
                            activePage === totalPage
                                ? 'pointer-events-none opacity-50'
                                : ''
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
