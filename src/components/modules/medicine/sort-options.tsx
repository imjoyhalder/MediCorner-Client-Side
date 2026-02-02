// components/medicines/sort-options.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";

export function SortOptions() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSortChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        // যদি value "default" হয় তাহলে sortBy parameter remove করি
        if (value === "default") {
            params.delete("sortBy");
        } else {
            params.set("sortBy", value);
        }

        params.set("page", "1"); // নতুন sorting এ first page-এ যাওয়া
        router.push(`/medicines?${params.toString()}`);
    };

    // URL থেকে current value নেওয়া, যদি না থাকে তাহলে "default"
    const currentSort = searchParams.get("sortBy") || "default";

    return (
        <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-gray-500" />
            <Select
                value={currentSort}
                onValueChange={handleSortChange}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="name-asc">Name: A to Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z to A</SelectItem>
                    <SelectItem value="rating-desc">Highest Rated</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}