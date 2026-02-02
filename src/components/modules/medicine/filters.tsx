"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category, MedicineFilters } from "@/types/medicine";
import { X, Filter } from "lucide-react";

interface FilterSortProps {
    categories: Category[];
    manufacturers: string[];
    minPrice: number;
    maxPrice: number;
    currentFilters: MedicineFilters;
    onChange: (filters: Partial<MedicineFilters>) => void;
}

export function FilterSort({
    categories,
    manufacturers,
    minPrice,
    maxPrice,
    currentFilters,
    onChange
}: FilterSortProps) {
    // Initialize local state from props (controlled)
    const [priceRange, setPriceRange] = useState<[number, number]>([
        currentFilters.minPrice ?? minPrice,
        currentFilters.maxPrice ?? maxPrice
    ]);
    const [selectedCategory, setSelectedCategory] = useState(currentFilters.category ?? "all");
    const [selectedManufacturer, setSelectedManufacturer] = useState(currentFilters.manufacturer ?? "all");
    const [showOtcOnly, setShowOtcOnly] = useState(currentFilters.isOtc ?? false);
    const [sortBy, setSortBy] = useState(currentFilters.sortBy ?? "default");

    const applyFilters = () => {
        onChange({
            category: selectedCategory !== "all" ? selectedCategory : undefined,
            manufacturer: selectedManufacturer !== "all" ? selectedManufacturer : undefined,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            isOtc: showOtcOnly,
            sortBy
        });
    };

    const resetFilters = () => {
        setSelectedCategory("all");
        setSelectedManufacturer("all");
        setPriceRange([minPrice, maxPrice]);
        setShowOtcOnly(false);
        setSortBy("default");
        onChange({
            category: undefined,
            manufacturer: undefined,
            minPrice: undefined,
            maxPrice: undefined,
            isOtc: undefined,
            sortBy: undefined
        });
    };

    const hasActiveFilters =
        selectedCategory !== "all" ||
        selectedManufacturer !== "all" ||
        priceRange[0] > minPrice ||
        priceRange[1] < maxPrice ||
        showOtcOnly ||
        sortBy !== "default";

    return (
        <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters & Sort
                </h3>
                {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={resetFilters} className="text-gray-500 hover:text-gray-700">
                        <X className="h-4 w-4 mr-1" />
                        Clear All
                    </Button>
                )}
            </div>

            {/* Category */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.slug}>
                            {cat.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Manufacturer */}
            <Select value={selectedManufacturer} onValueChange={setSelectedManufacturer}>
                <SelectTrigger>
                    <SelectValue placeholder="All Manufacturers" />
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

            {/* Price */}
            <div className="space-y-1">
                <Label className="font-medium text-gray-700">
                    Price: ৳{priceRange[0]} - ৳{priceRange[1]}
                </Label>
                <Slider value={priceRange} min={minPrice} max={maxPrice} step={10} onValueChange={setPriceRange} />
                <div className="flex justify-between text-sm text-gray-500">
                    <span>৳{minPrice}</span>
                    <span>৳{maxPrice}</span>
                </div>
            </div>

            {/* OTC */}
            <div className="flex items-center space-x-2">
                <Checkbox id="otc-only" checked={showOtcOnly} onCheckedChange={(val) => setShowOtcOnly(val as boolean)} />
                <Label htmlFor="otc-only" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Show OTC Only
                </Label>
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                    <SelectValue placeholder="Default" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="price-asc">Price: Low → High</SelectItem>
                    <SelectItem value="price-desc">Price: High → Low</SelectItem>
                    <SelectItem value="name-asc">Name: A → Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z → A</SelectItem>
                </SelectContent>
            </Select>

            {/* Apply */}
            <Button className="w-full bg-primary hover:bg-green-700 text-white" onClick={applyFilters}>
                Apply
            </Button>
        </div>
    );
}
