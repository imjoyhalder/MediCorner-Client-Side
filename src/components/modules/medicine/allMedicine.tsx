// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Search, Filter } from "lucide-react";

// import { MedicineCard } from "@/components/modules/medicine/card";
// import { MedicineFilters } from "@/components/modules/medicine/medicineFilters";
// import { SortOptions } from "@/components/modules/medicine/sort-options";
// import { MedicineSearchBar } from "@/components/modules/medicine/search-bar";

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Medicine, MedicineResponse, Category } from "@/types/medicine";
// import { MedicineServices } from "@/services/medecine.service";

// interface BrowseMedicinesPageProps {
//     categories: Category[];
//     manufacturers: string[];
// }

// export default function BrowseMedicinesPage({
//     categories,
//     manufacturers,
// }: BrowseMedicinesPageProps) {
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     // ================= STATE =================
//     const [medicines, setMedicines] = useState<Medicine[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [pagination, setPagination] = useState({
//         page: 1,
//         limit: 12,
//         total: 0,
//         totalPages: 1,
//     });

//     const [filters, setFilters] = useState({
//         search: searchParams.get("search") || "",
//         category: searchParams.get("category") || undefined,
//         manufacturer: searchParams.get("manufacturer") || undefined,
//         minPrice: searchParams.get("minPrice")
//             ? Number(searchParams.get("minPrice"))
//             : undefined,
//         maxPrice: searchParams.get("maxPrice")
//             ? Number(searchParams.get("maxPrice"))
//             : undefined,
//         isOtc: searchParams.get("isOtc") === "true",
//         sortBy: searchParams.get("sortBy") || "default",
//         page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
//     });

//     // ================= FETCH DATA =================
//     useEffect(() => {
//         const fetchMedicines = async () => {
//             setLoading(true);
//             try {
//                 // ১. সরাসরি response: MedicineResponse লিখবেন না
//                 const { data, error } = await MedicineServices.getAllMedicine(filters);

//                 if (error) {
//                     console.error(error);
//                     // আপনার চাইলে এখানে টোস্ট মেসেজ দিতে পারেন
//                     return;
//                 }

//                 // ২. data চেক করুন কারণ এটি null হতে পারে
//                 if (data) {
//                     setMedicines(data.data ?? []);
//                     setPagination(data.pagination ?? {
//                         page: 1,
//                         limit: 12,
//                         total: data.data?.length || 0,
//                         totalPages: 1,
//                     });
//                 }
//             } catch (err) {
//                 console.error("Unexpected Error:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchMedicines();
//     }, [filters]);

//     // ================= APPLY FILTERS =================
//     const handleFilterChange = (updated: Partial<typeof filters>) => {
//         setFilters((prev) => ({ ...prev, ...updated, page: 1 }));
//     };

//     // ================= UI =================
//     return (
//         <div className="min-h-screen bg-[#f8fafc] px-4 py-8">
//             <div className="max-w-7xl mx-auto space-y-10">

//                 {/* ---------------- HEADER & SEARCH ---------------- */}
//                 <div className="space-y-4 text-center">
//                     <h1 className="text-3xl md:text-4xl font-bold text-[#22c55e]">
//                         Browse Medicines
//                     </h1>
//                     <p className="text-slate-600">
//                         Search and filter medicines by category, manufacturer, and price
//                     </p>
//                     <MedicineSearchBar initialSearch={filters.search} />
//                 </div>

//                 <div className="flex flex-col lg:flex-row gap-8">
//                     {/* ---------------- FILTERS ---------------- */}
//                     <aside className="hidden lg:block w-64 shrink-0">
//                         <div className="sticky top-24 space-y-6">
//                             <MedicineFilters
//                                 categories={categories}
//                                 manufacturers={manufacturers}
//                                 onChange={(key, value) =>
//                                     handleFilterChange({ [key]: value })
//                                 }
//                             />
//                         </div>
//                     </aside>

//                     {/* ---------------- MEDICINES GRID ---------------- */}
//                     <main className="flex-1">
//                         <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
//                             <div>
//                                 <h2 className="text-xl font-semibold">
//                                     {medicines.length
//                                         ? "Available Medicines"
//                                         : "No Medicines Found"}
//                                 </h2>
//                                 <p className="text-sm text-slate-500">
//                                     {pagination.total} results
//                                 </p>
//                             </div>

//                             <SortOptions />
//                         </div>

//                         {loading ? (
//                             <div className="text-center py-20 text-slate-500">
//                                 Loading medicines...
//                             </div>
//                         ) : medicines.length ? (
//                             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
//                                 {medicines.map((m) => (
//                                     <MedicineCard key={m.id} medicine={m} />
//                                 ))}
//                             </div>
//                         ) : (
//                             <Card className="py-16">
//                                 <CardContent className="text-center space-y-4">
//                                     <p className="text-slate-500">No medicines found</p>
//                                     <Button
//                                         className="bg-[#22c55e] hover:bg-green-700 text-white"
//                                         onClick={() => setFilters({})}
//                                     >
//                                         Clear Filters
//                                     </Button>
//                                 </CardContent>
//                             </Card>
//                         )}
//                     </main>
//                 </div>

//                 {/* ---------------- FEATURE CARDS ---------------- */}
//                 <div className="grid md:grid-cols-3 gap-8">
//                     <Card className="text-center">
//                         <CardContent className="space-y-3">
//                             <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
//                                 <Filter className="h-6 w-6 text-[#22c55e]" />
//                             </div>
//                             <h3 className="font-semibold">Advanced Filtering</h3>
//                             <p className="text-sm text-slate-500">
//                                 Filter by category, price, manufacturer & OTC
//                             </p>
//                         </CardContent>
//                     </Card>

//                     <Card className="text-center">
//                         <CardContent className="space-y-3">
//                             <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
//                                 <Search className="h-6 w-6 text-[#22c55e]" />
//                             </div>
//                             <h3 className="font-semibold">Verified Products</h3>
//                             <p className="text-sm text-slate-500">
//                                 Only trusted and verified medicines
//                             </p>
//                         </CardContent>
//                     </Card>

//                     <Card className="text-center">
//                         <CardContent className="space-y-3">
//                             <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
//                                 <Search className="h-6 w-6 text-[#22c55e]" />
//                             </div>
//                             <h3 className="font-semibold">Fast Delivery</h3>
//                             <p className="text-sm text-slate-500">
//                                 Quick and reliable doorstep delivery
//                             </p>
//                         </CardContent>
//                     </Card>
//                 </div>

//             </div>
//         </div>
//     );
// }


import { MedicineServices } from "@/services/medecine.service";
import { MedicineCard } from "@/components/modules/medicine/card";
import { MedicineFilters as IMedicineFilters, Category } from "@/types/medicine";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, CircleDollarSign } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
    searchParams: Promise<Partial<Record<keyof IMedicineFilters, string>>>;
}

export default async function MedicinesPage({ searchParams }: Props) {
    const resolvedParams = await searchParams;

    // ১. টাইপ-সেফ ফিল্টার অবজেক্ট (Next.js 15 unwrapping)
    const filters: IMedicineFilters = {
        search: resolvedParams.search,
        categoryId: resolvedParams.categoryId,
        manufacturer: resolvedParams.manufacturer,
        minPrice: resolvedParams.minPrice ? Number(resolvedParams.minPrice) : undefined,
        maxPrice: resolvedParams.maxPrice ? Number(resolvedParams.maxPrice) : undefined,
        page: resolvedParams.page ? Number(resolvedParams.page) : 1,
        sortBy: resolvedParams.sortBy || "name",
    };

    // ২. ডাটা ফেচিং
    const [medRes, catRes, manRes] = await Promise.all([
        MedicineServices.getAllMedicine(filters),
        MedicineServices.getCategories(),
        MedicineServices.getManufacturers(),
    ]);

    const medicines = medRes.data?.data || [];
    const pagination = medRes.data?.pagination;
    const categories = catRes.data || [];
    const manufacturers = manRes.data || [];

    // ৩. URL জেনারেশন হেল্পার (Any বাদ দিয়ে)
    const getQueryPath = (updates: Partial<Record<string, string | number | undefined>>) => {
        const current = new URLSearchParams(resolvedParams as Record<string, string>);
        Object.entries(updates).forEach(([key, value]) => {
            if (value && value !== "all") current.set(key, value.toString());
            else current.delete(key);
        });
        if (!updates.page) current.set("page", "1");
        return `/medicine?${current.toString()}`;
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] pb-12">
            {/* সার্চ সেকশন: Server Action ব্যবহার করা হয়েছে */}
            <div className="bg-white border-b sticky top-0 z-40 py-6">
                <div className="container mx-auto px-4">
                    <form action={async (formData: FormData) => {
                        "use server";
                        const search = formData.get("search") as string;
                        const params = new URLSearchParams(resolvedParams as Record<string, string>);
                        if (search) params.set("search", search); else params.delete("search");
                        params.set("page", "1");
                        redirect(`/medicine?${params.toString()}`);
                    }} className="flex gap-3 max-w-3xl mx-auto">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <Input 
                                name="search"
                                defaultValue={filters.search}
                                placeholder="Search by medicine or brand name..." 
                                className="pl-12 h-12 rounded-full border-slate-200 focus:ring-green-500"
                            />
                        </div>
                        <Button type="submit" className="h-12 px-8 rounded-full bg-green-600 hover:bg-green-700 font-bold shadow-lg shadow-green-100 transition-all">
                            Search
                        </Button>
                    </form>
                </div>
            </div>

            <main className="container mx-auto px-4 py-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* বাম দিকের ফিল্টার সাইডবার */}
                    <aside className="w-full lg:w-72 shrink-0 space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-32">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <SlidersHorizontal className="h-5 w-5 text-green-600" /> Filters
                                </h3>
                                <Link href="/medicine" className="text-xs font-bold text-red-500 hover:text-red-600 uppercase tracking-tighter">Reset</Link>
                            </div>

                            {/* ক্যাটাগরি ফিল্টার */}
                            <div className="space-y-3 mb-8">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Category</label>
                                <Select onValueChange={(v) => redirect(getQueryPath({ categoryId: v }))} defaultValue={filters.categoryId || "all"}>
                                    <SelectTrigger className="w-full bg-slate-50 border-none h-11">
                                        <SelectValue placeholder="All Categories" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        {categories.map((c: Category) => (
                                            <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* ম্যানুফ্যাকচারার ফিল্টার */}
                            <div className="space-y-3 mb-8">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Manufacturer</label>
                                <Select onValueChange={(v) => redirect(getQueryPath({ manufacturer: v }))} defaultValue={filters.manufacturer || "all"}>
                                    <SelectTrigger className="w-full bg-slate-50 border-none h-11">
                                        <SelectValue placeholder="All Brands" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Brands</SelectItem>
                                        {manufacturers.map((m: string) => (
                                            <SelectItem key={m} value={m}>{m}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* প্রাইস ফিল্টার */}
                            <div className="space-y-3 pt-6 border-t border-slate-100">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <CircleDollarSign className="h-4 w-4" /> Price Range (৳)
                                </label>
                                <form action={async (formData: FormData) => {
                                    "use server";
                                    const min = formData.get("minPrice") as string;
                                    const max = formData.get("maxPrice") as string;
                                    const params = new URLSearchParams(resolvedParams as Record<string, string>);
                                    if (min) params.set("minPrice", min); else params.delete("minPrice");
                                    if (max) params.set("maxPrice", max); else params.delete("maxPrice");
                                    params.set("page", "1");
                                    redirect(`/medicine?${params.toString()}`);
                                }} className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Input name="minPrice" type="number" placeholder="Min" defaultValue={filters.minPrice} className="bg-slate-50 h-10 text-sm" />
                                        <span className="text-slate-300">—</span>
                                        <Input name="maxPrice" type="number" placeholder="Max" defaultValue={filters.maxPrice} className="bg-slate-50 h-10 text-sm" />
                                    </div>
                                    <Button type="submit" variant="outline" className="w-full text-xs font-bold border-green-200 text-green-700 hover:bg-green-50">Apply Price</Button>
                                </form>
                            </div>
                        </div>
                    </aside>

                    {/* ডান দিকের প্রোডাক্ট সেকশন */}
                    <div className="flex-1 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-slate-500 text-sm font-medium italic">
                                Showing {medicines.length} results of {pagination?.total || 0} medicines
                            </h2>
                        </div>

                        {medicines.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {medicines.map((med) => (
                                    <MedicineCard key={med.id} medicine={med} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-32 text-center bg-white rounded-3xl border-2 border-dashed border-slate-100">
                                <p className="text-slate-400 font-medium">No results found matching your criteria.</p>
                                <Link href="/medicine" className="text-green-600 text-sm font-bold mt-2 inline-block">Clear all filters</Link>
                            </div>
                        )}

                        {/* প্যাগিনেশন */}
                        {pagination && pagination.totalPages > 1 && (
                            <div className="flex items-center justify-center gap-4 mt-12">
                                <Button variant="ghost" className="rounded-full gap-2 text-slate-600" asChild disabled={filters.page === 1}>
                                    <Link href={getQueryPath({ page: (filters.page! - 1) })}>
                                        <ChevronLeft className="h-4 w-4" /> Prev
                                    </Link>
                                </Button>
                                <div className="flex items-center gap-2">
                                    <span className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold shadow-md">
                                        {filters.page}
                                    </span>
                                    <span className="text-slate-400 font-medium">of {pagination.totalPages}</span>
                                </div>
                                <Button variant="ghost" className="rounded-full gap-2 text-slate-600" asChild disabled={filters.page === pagination.totalPages}>
                                    <Link href={getQueryPath({ page: (filters.page! + 1) })}>
                                        Next <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}