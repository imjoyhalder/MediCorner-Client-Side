"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface MedicineSearchBarProps {
    initialSearch?: string;
}

export function MedicineSearchBar({ initialSearch = "" }: MedicineSearchBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(initialSearch);
    const [isSearching, setIsSearching] = useState(false);


    useEffect(() => {
        const param = searchParams.get("search") || "";
        setSearch(param);
    }, [searchParams]);

    const handleSearch = () => {
        if (isSearching) return;

        const params = new URLSearchParams(searchParams.toString());

        if (search.trim()) {
            params.set("search", search.trim());
            params.set("page", "1");
        } else {
            params.delete("search");
        }

        setIsSearching(true);
        router.push(`/medicines?${params.toString()}`);

        setTimeout(() => setIsSearching(false), 300);
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

                <Input
                    type="search"
                    placeholder="Search medicines by name, brand, or generic name..."
                    className="pl-12 pr-28 h-14 text-base rounded-2xl border-2 border-gray-200 focus:border-primary shadow-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSearch();
                        }
                    }}
                />

                <Button
                    type="button"
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-6 rounded-xl bg-primary hover:bg-green-600"
                >
                    {isSearching ? "Searching..." : "Search"}
                </Button>
            </div>
        </div>
    );
}
