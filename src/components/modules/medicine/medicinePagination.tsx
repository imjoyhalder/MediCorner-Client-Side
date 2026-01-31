"use client"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination"

export function MedicinePagination({
    page,
    totalPages,
    onPageChange
}: {
    page: number
    totalPages: number
    onPageChange: (p: number) => void
}) {
    return (
        <Pagination className="mt-10">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={() => onPageChange(Math.max(1, page - 1))}
                    />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                        <PaginationLink
                            href="#"
                            isActive={page === i + 1}
                            onClick={() => onPageChange(i + 1)}
                        >
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
