"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export function PriceSlider({ min, max }: { min?: number; max?: number }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [range, setRange] = useState([min || 0, max || 10000]);

    const handleApply = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("minPrice", range[0].toString());
        params.set("maxPrice", range[1].toString());
        params.set("page", "1");
        router.push(`/medicine?${params.toString()}`);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>৳{range[0]}</span>
                <span>৳{range[1]}</span>
            </div>
            <Slider
                defaultValue={[range[0], range[1]]}
                max={10000}
                step={100}
                onValueChange={(value) => setRange(value)}
                className="cursor-pointer"
            />
            <Button
                onClick={handleApply}
                variant="outline"
                className="w-full text-xs font-bold border-green-200 text-green-700 hover:bg-green-50 h-8"
            >
                Apply Range
            </Button>
        </div>
    );
}