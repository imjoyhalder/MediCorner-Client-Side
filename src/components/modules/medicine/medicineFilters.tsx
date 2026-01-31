"use client"

import { Category } from "@/types/category"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue
} from "@/components/ui/select"

export function MedicineFilters({
    categories,
    manufacturers,
    onChange
}: {
    categories: Category[]
    manufacturers: string[]
    onChange: (key: string, value: string) => void
}) {
    return (
        <div className="space-y-4">
            <Select onValueChange={(v) => onChange("category", v)}>
                <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(c => (
                        <SelectItem key={c.id} value={c.slug}>
                            {c.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select onValueChange={(v) => onChange("manufacturer", v)}>
                <SelectTrigger><SelectValue placeholder="Manufacturer" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Manufacturers</SelectItem>
                    {manufacturers.map(m => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Input
                type="number"
                placeholder="Max price (৳)"
                onChange={(e) => onChange("price", e.target.value)}
            />
        </div>
    )
}
