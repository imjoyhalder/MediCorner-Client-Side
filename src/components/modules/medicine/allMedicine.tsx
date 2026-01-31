"use client"

import { useState } from "react"
import { Medicine } from "@/types/medicine"
import { Category } from "@/types/category"
import { MedicineFilters } from "./medicineFilters"
import { MedicineCard } from "./card"
import { MedicinePagination } from "./medicinePagination"

export function AllMedicineClient({
    medicines,
    categories
}: {
    medicines: Medicine[]
    categories: Category[]
}) {
    const [page, setPage] = useState(1)

    const manufacturers = Array.from(
        new Set(medicines.map(m => m.manufacturer))
    )

    return (
        <div className="mx-auto max-w-7xl px-4 py-10">
            <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
                {/* Filters */}
                <MedicineFilters
                    categories={categories}
                    manufacturers={manufacturers}
                    onChange={() => { }}
                />

                {/* Grid */}
                <div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {medicines.map(m => (
                            <MedicineCard key={m.id} medicine={m} />
                        ))}
                    </div>

                    <MedicinePagination
                        page={page}
                        totalPages={5}
                        onPageChange={setPage}
                    />
                </div>
            </div>
        </div>
    )
}
