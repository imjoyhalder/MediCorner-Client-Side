// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// interface FilterDropdownProps {
//     items: { id: string; name: string }[] | string[];
//     placeholder: string;
//     filterKey: string;
//     defaultValue?: string;
// }

// export function FilterDropdown({ items, placeholder, filterKey, defaultValue }: FilterDropdownProps) {
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     const handleSelect = (value: string) => {
//         const params = new URLSearchParams(searchParams.toString());
//         if (value === "all") {
//             params.delete(filterKey);
//         } else {
//             params.set(filterKey, value);
//         }
//         params.set("page", "1"); 
//         router.push(`/medicine?${params.toString()}`);
//     };

//     return (
//         <Select onValueChange={handleSelect} defaultValue={defaultValue || "all"}>
//             <SelectTrigger className="w-full bg-slate-50 border-none h-11 text-slate-700 font-medium capitalize">
//                 <SelectValue placeholder={placeholder} />
//             </SelectTrigger>
//             <SelectContent>
//                 <SelectItem value="all">All {filterKey === 'categoryId' ? 'Categories' : 'Brands'}</SelectItem>
//                 {items.map((item) => {
//                     const id = typeof item === "string" ? item : item.id;
//                     const name = typeof item === "string" ? item : item.name;
//                     return (
//                         <SelectItem key={id} value={id.toString()} className="capitalize">
//                             {name}
//                         </SelectItem>
//                     );
//                 })}
//             </SelectContent>
//         </Select>
//     );
// }

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterDropdownProps {
    items: { id: string; name: string }[] | string[];
    placeholder: string;
    filterKey: string;
    defaultValue?: string;
}

export function FilterDropdown({ items, placeholder, filterKey, defaultValue }: FilterDropdownProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSelect = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === "all") {
            params.delete(filterKey);
        } else {
            params.set(filterKey, value);
        }
        params.set("page", "1"); 
        router.push(`/medicine?${params.toString()}`);
    };

    return (
        <Select onValueChange={handleSelect} defaultValue={defaultValue || "all"}>
            <SelectTrigger className="w-full bg-slate-50 border-slate-200 h-11 text-slate-700 font-semibold capitalize rounded-xl focus:ring-green-500/20 focus:border-green-500 transition-all">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                <SelectItem value="all" className="font-bold text-slate-500">
                    All {filterKey === 'categoryId' ? 'Categories' : 'Brands'}
                </SelectItem>
                {items.map((item) => {
                    const id = typeof item === "string" ? item : item.id;
                    const name = typeof item === "string" ? item : item.name;
                    return (
                        <SelectItem key={id} value={id.toString()} className="capitalize py-2.5 cursor-pointer">
                            {name}
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
}