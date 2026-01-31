"use client"

import { useMemo, useState } from "react"
import { Medicine } from "@/types/medicine"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { MedicineCard } from "./card"

export function AllMedicinePage({ medicines }: { medicines: Medicine[] }) {
    const [category, setCategory] = useState("all")
    const [manufacturer, setManufacturer] = useState("all")
    const [maxPrice, setMaxPrice] = useState("")

    const categories = Array.from(
        new Set(medicines.map((m) => m.category.name))
    )

    const manufacturers = Array.from(
        new Set(medicines.map((m) => m.manufacturer))
    )

    const filteredMedicines = useMemo(() => {
        return medicines.filter((m) => {
            const price = m.sellers[0]?.price ?? 0

            return (
                (category === "all" || m.category.name === category) &&
                (manufacturer === "all" || m.manufacturer === manufacturer) &&
                (!maxPrice || price <= Number(maxPrice))
            )
        })
    }, [medicines, category, manufacturer, maxPrice])

    return (
        <div className="mx-auto max-w-7xl px-4 py-10">
            <h1 className="mb-6 text-2xl font-bold text-[#0f172a]">
                All Medicines
            </h1>

            {/* Filters */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Select onValueChange={setCategory}>
                    <SelectTrigger>
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((c) => (
                            <SelectItem key={c} value={c}>
                                {c}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select onValueChange={setManufacturer}>
                    <SelectTrigger>
                        <SelectValue placeholder="Manufacturer" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Manufacturers</SelectItem>
                        {manufacturers.map((m) => (
                            <SelectItem key={m} value={m}>
                                {m}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Input
                    type="number"
                    placeholder="Max price (৳)"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {filteredMedicines.map((medicine) => (
                    <MedicineCard key={medicine.id} medicine={medicine} />
                ))}
            </div>
        </div>
    )
}
