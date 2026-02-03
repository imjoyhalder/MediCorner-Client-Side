
// import { Suspense } from "react";
// import { MedicineServices } from "@/services/medecine.service";
// import { MedicineCard } from "@/components/modules/medicine/card";
// import { MedicineFilters as IMedicineFilters, Category } from "@/types/medicine";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//     Search,
//     SlidersHorizontal,
//     ChevronLeft,
//     ChevronRight,
//     CircleDollarSign,
//     Filter
// } from "lucide-react";
// import Link from "next/link";
// import { redirect } from "next/navigation";
// import { PriceSlider } from "@/components/modules/medicine/price-slider";
// import { MedicineSkeleton } from "@/components/modules/medicine/skeleton";

// import {
//     Sheet,
//     SheetContent,
//     SheetHeader,
//     SheetTitle,
//     SheetTrigger,
// } from "@/components/ui/sheet";
// import { FilterDropdown } from "@/components/modules/medicine/filter-dropdown";

// interface Props {
//     searchParams: Promise<Partial<Record<keyof IMedicineFilters, string>>>;
// }


// interface FilterContentProps {
//     filters: IMedicineFilters;
//     categories: Category[];
//     manufacturers: string[];
// }

// const FilterContent = ({ filters, categories, manufacturers }: FilterContentProps) => (
//     <div className="space-y-6">
//         <div className="flex items-center justify-between">
//             <h3 className="font-bold text-lg flex items-center gap-2">
//                 <SlidersHorizontal className="h-4 w-4 text-green-600" /> Filters
//             </h3>
//             <Link href="/medicine" className="text-xs font-bold text-red-500 hover:underline">RESET</Link>
//         </div>

//         <div className="space-y-3">
//             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Category</label>
//             <FilterDropdown
//                 items={categories}
//                 placeholder="Select Category"
//                 filterKey="categoryId"
//                 defaultValue={filters.categoryId}
//             />
//         </div>

//         <div className="space-y-3">
//             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Manufacturer</label>
//             <FilterDropdown
//                 items={manufacturers}
//                 placeholder="Select Brand"
//                 filterKey="manufacturer"
//                 defaultValue={filters.manufacturer}
//             />
//         </div>

//         <div className="space-y-3 pt-6 border-t border-slate-100">
//             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
//                 <CircleDollarSign className="h-4 w-4 text-green-600" /> Price Range (৳)
//             </label>
//             <PriceSlider min={filters.minPrice} max={filters.maxPrice} />
//         </div>
//     </div>
// );

// // Search Server Action
// async function handleSearch(formData: FormData) {
//     "use server";
//     const search = formData.get("search") as string;
//     const params = new URLSearchParams();
//     if (search) params.set("search", search);
//     params.set("page", "1");
//     redirect(`/medicine?${params.toString()}`);
// }

// export default async function MedicinesPage({ searchParams }: Props) {
//     const resolvedParams = await searchParams;

//     const filters: IMedicineFilters = {
//         search: resolvedParams.search,
//         categoryId: resolvedParams.categoryId,
//         manufacturer: resolvedParams.manufacturer,
//         minPrice: resolvedParams.minPrice ? Number(resolvedParams.minPrice) : 0,
//         maxPrice: resolvedParams.maxPrice ? Number(resolvedParams.maxPrice) : 10000,
//         page: resolvedParams.page ? Number(resolvedParams.page) : 1,
//         sortBy: resolvedParams.sortBy || "name",
//     };

//     const [medRes, catRes, manRes] = await Promise.all([
//         MedicineServices.getAllMedicine(filters),
//         MedicineServices.getCategories(),
//         MedicineServices.getManufacturers(),
//     ]);

//     const medicines = medRes.data?.data || [];
//     const pagination = medRes.data?.pagination;
//     const categories = catRes.data || [];
//     const manufacturers = manRes.data || [];

//     const getQueryPath = (updates: Record<string, string | number | undefined>) => {
//         const current = new URLSearchParams(resolvedParams as Record<string, string>);
//         Object.entries(updates).forEach(([key, value]) => {
//             if (value === "all" || value === undefined || value === "") current.delete(key);
//             else current.set(key, value.toString());
//         });
//         if (!updates.page) current.set("page", "1");
//         return `/medicine?${current.toString()}`;
//     };

//     return (
//         <div className="min-h-screen pb-12">
//             {/* Header Search Area */}
//             <div className="bg-white border-b sticky top-0 z-40 py-4 lg:py-6 shadow-sm">
//                 <div className="container mx-auto px-4 flex flex-col md:flex-row gap-4 items-center">
//                     <form action={handleSearch} className="flex gap-2 w-full max-w-3xl mx-auto">
//                         <div className="relative flex-1">
//                             <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
//                             <Input
//                                 name="search"
//                                 defaultValue={filters.search}
//                                 placeholder="Search medicines..."
//                                 className="pl-12 h-11 lg:h-12 rounded-full border-slate-200 focus-visible:ring-green-500"
//                             />
//                         </div>
//                         <Button type="submit" className="h-11 lg:h-12 px-6 lg:px-8 rounded-full bg-green-600 hover:bg-green-700 font-bold shadow-md shadow-green-100">
//                             Search
//                         </Button>
//                     </form>

//                     {/* Mobile Filter Button */}
//                     <div className="lg:hidden w-full">
//                         <Sheet>
//                             <SheetTrigger asChild>
//                                 <Button variant="outline" className="w-full rounded-full gap-2 font-bold border-green-200 text-green-700">
//                                     <Filter className="h-4 w-4" /> Open Filters
//                                 </Button>
//                             </SheetTrigger>
//                             <SheetContent side="left" className="w-[300px] sm:w-[400px]">
//                                 <SheetHeader className="text-left">
//                                     <SheetTitle className="text-2xl font-black text-slate-800">MediStore</SheetTitle>
//                                 </SheetHeader>
//                                 <div className="mt-8">

//                                     <FilterContent
//                                         filters={filters}
//                                         categories={categories}
//                                         manufacturers={manufacturers}
//                                     />
//                                 </div>
//                             </SheetContent>
//                         </Sheet>
//                     </div>
//                 </div>
//             </div>

//             <main className="container mx-auto px-4 py-8">
//                 <div className="flex flex-col lg:flex-row gap-8">

//                     {/* Desktop Sidebar */}
//                     <aside className="hidden lg:block w-72 shrink-0">
//                         <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-32">
//                             <FilterContent
//                                 filters={filters}
//                                 categories={categories}
//                                 manufacturers={manufacturers}
//                             />
//                         </div>
//                     </aside>

//                     {/* Content Area */}
//                     <div className="flex-1 space-y-6">
//                         <div className="flex justify-between items-center text-sm font-medium text-slate-500 bg-white/50 p-4 rounded-xl border border-slate-100">
//                             <p>Showing <span className="text-green-700 font-bold">{medicines.length}</span> of {pagination?.total || 0} medicines</p>
//                         </div>

//                         <Suspense fallback={<MedicineSkeleton />}>
//                             {medicines.length > 0 ? (
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//                                     {medicines.map((med) => (
//                                         <MedicineCard key={med.id} medicine={med} />
//                                     ))}
//                                 </div>
//                             ) : (
//                                 <div className="py-24 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
//                                     <p className="text-slate-400 font-semibold text-lg">No results found!</p>
//                                     <Link href="/medicine" className="text-green-600 text-sm font-bold mt-2 inline-block">Reset all filters</Link>
//                                 </div>
//                             )}

//                             {/* Pagination Logic */}
//                             {pagination && pagination.totalPages > 1 && (
//                                 <div className="flex items-center justify-center gap-2 mt-12 overflow-x-auto py-4">
//                                     <Button variant="ghost" className="rounded-full h-10 w-10 p-0" asChild disabled={filters.page === 1}>
//                                         <Link href={getQueryPath({ page: filters.page! - 1 })}><ChevronLeft className="h-5 w-5" /></Link>
//                                     </Button>

//                                     {[...Array(pagination.totalPages)].map((_, i) => (
//                                         <Link
//                                             key={i}
//                                             href={getQueryPath({ page: i + 1 })}
//                                             className={`min-w-[40px] h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all ${filters.page === i + 1 ? 'bg-green-600 text-white shadow-lg shadow-green-100' : 'bg-white hover:bg-slate-100 text-slate-600 border'}`}
//                                         >
//                                             {i + 1}
//                                         </Link>
//                                     ))}

//                                     <Button variant="ghost" className="rounded-full h-10 w-10 p-0" asChild disabled={filters.page === pagination.totalPages}>
//                                         <Link href={getQueryPath({ page: filters.page! + 1 })}><ChevronRight className="h-5 w-5" /></Link>
//                                     </Button>
//                                 </div>
//                             )}
//                         </Suspense>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }

import { Suspense } from "react";
import { MedicineServices } from "@/services/medecine.service";
import { MedicineCard } from "@/components/modules/medicine/card";
import { MedicineFilters as IMedicineFilters, Category } from "@/types/medicine";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Search,
    SlidersHorizontal,
    ChevronLeft,
    ChevronRight,
    CircleDollarSign,
    Filter,
    PackageSearch,
    RotateCcw
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PriceSlider } from "@/components/modules/medicine/price-slider";
import { MedicineSkeleton } from "@/components/modules/medicine/skeleton";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { FilterDropdown } from "@/components/modules/medicine/filter-dropdown";

interface Props {
    searchParams: Promise<Partial<Record<keyof IMedicineFilters, string>>>;
}

interface FilterContentProps {
    filters: IMedicineFilters;
    categories: Category[];
    manufacturers: string[];
}

const FilterContent = ({ filters, categories, manufacturers }: FilterContentProps) => (
    <div className="space-y-8">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 flex items-center gap-2.5">
                <div className="p-1.5 bg-green-100 rounded-md">
                    <SlidersHorizontal className="h-4 w-4 text-green-700" />
                </div>
                Filters
            </h3>
            <Button variant="ghost" size="sm" asChild className="h-8 text-xs font-bold text-red-500 hover:text-red-600 hover:bg-red-50 px-2 uppercase tracking-tighter">
                <Link href="/medicine">Reset All</Link>
            </Button>
        </div>

        <div className="space-y-6">
            <div className="space-y-3">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] ml-1">Category</label>
                <FilterDropdown
                    items={categories}
                    placeholder="Select Category"
                    filterKey="categoryId"
                    defaultValue={filters.categoryId}
                />
            </div>

            <div className="space-y-3">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] ml-1">Manufacturer</label>
                <FilterDropdown
                    items={manufacturers}
                    placeholder="Select Brand"
                    filterKey="manufacturer"
                    defaultValue={filters.manufacturer}
                />
            </div>

            <div className="space-y-5 pt-4">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] ml-1 flex items-center gap-2">
                    <CircleDollarSign className="h-4 w-4 text-green-600" /> Price Range (৳)
                </label>
                <div className="px-1">
                    <PriceSlider min={filters.minPrice} max={filters.maxPrice} />
                </div>
            </div>
        </div>
    </div>
);

async function handleSearch(formData: FormData) {
    "use server";
    const search = formData.get("search") as string;
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    params.set("page", "1");
    redirect(`/medicine?${params.toString()}`);
}

export default async function MedicinesPage({ searchParams }: Props) {
    const resolvedParams = await searchParams;

    const filters: IMedicineFilters = {
        search: resolvedParams.search,
        categoryId: resolvedParams.categoryId,
        manufacturer: resolvedParams.manufacturer,
        minPrice: resolvedParams.minPrice ? Number(resolvedParams.minPrice) : 0,
        maxPrice: resolvedParams.maxPrice ? Number(resolvedParams.maxPrice) : 10000,
        page: resolvedParams.page ? Number(resolvedParams.page) : 1,
        sortBy: resolvedParams.sortBy || "name",
    };

    const [medRes, catRes, manRes] = await Promise.all([
        MedicineServices.getAllMedicine(filters),
        MedicineServices.getCategories(),
        MedicineServices.getManufacturers(),
    ]);

    const medicines = medRes.data?.data || [];
    const pagination = medRes.data?.pagination;
    const categories = catRes.data || [];
    const manufacturers = manRes.data || [];

    const getQueryPath = (updates: Record<string, string | number | undefined>) => {
        const current = new URLSearchParams(resolvedParams as Record<string, string>);
        Object.entries(updates).forEach(([key, value]) => {
            if (value === "all" || value === undefined || value === "") current.delete(key);
            else current.set(key, value.toString());
        });
        if (!updates.page) current.set("page", "1");
        return `/medicine?${current.toString()}`;
    };

    return (
        <div className="min-h-screen  pb-20">
            {/* Header Search Area - STICKY & BLURRED */}
            {/* <div>
                <h1 className="text-6xl text-center mt-4 text-green-600 font-bold">All Medicine</h1>
            </div>
            <div className=" sticky top-[64px] lg:top-[80px] z-30 py-4 lg:py-5 ">
                <div className="container mx-auto px-4 flex flex-col md:flex-row gap-4 items-center">
                    <form action={handleSearch} className="flex gap-2 w-full max-w-4xl mx-auto">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-green-600 transition-colors" />
                            <Input
                                name="search"
                                defaultValue={filters.search}
                                placeholder="Search by name, generic or brand..."
                                className="pl-12 h-12 lg:h-14 rounded-2xl border-slate-200 bg-slate-50/50 focus-visible:ring-green-500 focus-visible:bg-white transition-all text-base"
                            />
                        </div>
                        <Button type="submit" className="h-12 lg:h-14 px-8 rounded-2xl bg-green-600 hover:bg-green-700 font-bold shadow-lg shadow-green-100 transition-transform active:scale-95">
                            Search
                        </Button>
                    </form>


                    <div className="lg:hidden w-full">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="w-full h-12 rounded-2xl gap-2 font-bold border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm">
                                    <Filter className="h-4 w-4 text-green-600" /> Filter Results
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[320px] rounded-r-3xl border-r-0 p-6">
                                <SheetHeader className="text-left mb-8">
                                    <SheetTitle className="text-2xl font-black text-green-700 tracking-tight">Filters</SheetTitle>
                                </SheetHeader>
                                <FilterContent
                                    filters={filters}
                                    categories={categories}
                                    manufacturers={manufacturers}
                                />
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div> */}

            {/* Header Section */}
            <div className=" pt-8 pb-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl text-center text-green-600 font-extrabold tracking-tight">
                    All Medicines
                </h1>
                <p className="text-center text-slate-500 mt-2 text-sm md:text-base">
                    Find your required healthcare products easily
                </p>
            </div>

            {/* Header Search Area - STICKY & BLURRED */}
            <div className="sticky top-[64px] lg:top-[80px] z-30 py-4 transition-all duration-300  backdrop-blur-md ">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-4 items-center max-w-7xl mx-auto">

                        {/* Search Form */}
                        <form action={handleSearch} className="flex gap-2 w-full lg:flex-1">
                            <div className="relative flex-1 group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-green-600 transition-colors" />
                                <Input
                                    name="search"
                                    defaultValue={filters.search}
                                    placeholder="Search by name, generic or brand..."
                                    className="pl-12 h-12 lg:h-14 rounded-xl border-slate-200 bg-white/50 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:bg-white transition-all text-base shadow-sm"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="h-12 lg:h-14 px-6 lg:px-10 rounded-xl bg-green-600 hover:bg-green-700 font-bold text-white shadow-lg shadow-green-100 transition-all active:scale-95"
                            >
                                <Search className="h-5 w-5 lg:hidden" />
                                <span className="hidden lg:inline">Search Now</span>
                            </Button>
                        </form>

                        {/* Mobile Filter Trigger - Hidden on Large Screens */}
                        <div className="lg:hidden w-full">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full h-12 rounded-xl gap-2 font-bold border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm"
                                    >
                                        <SlidersHorizontal className="h-4 w-4 text-green-600" />
                                        Filter Results
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-[300px] sm:w-[350px] rounded-r-2xl p-0 border-none">
                                    <div className="h-full flex flex-col">
                                        <SheetHeader className="p-6 border-b text-left">
                                            <SheetTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                                <div className="h-8 w-1 bg-green-600 rounded-full" />
                                                Refine Search
                                            </SheetTitle>
                                        </SheetHeader>
                                        <div className="flex-1 overflow-y-auto p-6">
                                            <FilterContent
                                                filters={filters}
                                                categories={categories}
                                                manufacturers={manufacturers}
                                            />
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-10">

                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-72 shrink-0">
                        <div className="bg-white rounded-[2rem] border border-slate-200/60 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] sticky top-44">
                            <FilterContent
                                filters={filters}
                                categories={categories}
                                manufacturers={manufacturers}
                            />
                        </div>
                    </aside>

                    {/* Content Area */}
                    <div className="flex-1 space-y-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-black text-slate-800 tracking-tight">Available Medicines</h1>
                                <p className="text-slate-500 text-sm font-medium mt-1">
                                    Showing <span className="text-green-700 font-bold">{medicines.length}</span> of {pagination?.total || 0} products
                                </p>
                            </div>
                            <Button variant="outline" size="sm" className="rounded-full gap-2 text-slate-500 h-9" asChild>
                                <Link href="/medicine"><RotateCcw className="h-3.5 w-3.5" /> Reset</Link>
                            </Button>
                        </div>

                        <Suspense key={JSON.stringify(resolvedParams)} fallback={<MedicineSkeleton />}>
                            {medicines.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                                    {medicines.map((med) => (
                                        <MedicineCard key={med.id} medicine={med} />
                                    ))}
                                </div>
                            ) : (
                                <div className="py-32 text-center bg-white rounded-[3rem] border border-dashed border-slate-200 flex flex-col items-center justify-center space-y-5">
                                    <div className="p-6 bg-slate-50 rounded-full">
                                        <PackageSearch className="h-12 w-12 text-slate-300" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-bold text-slate-800">No matches found</h3>
                                        <p className="text-slate-500 max-w-[280px] mx-auto text-sm">We couldn&apos;t find any medicine matching your current filters.</p>
                                    </div>
                                    <Button asChild className="rounded-full px-8 bg-green-600">
                                        <Link href="/medicine">Clear all filters</Link>
                                    </Button>
                                </div>
                            )}

                            {/* Refined Pagination */}
                            {pagination && pagination.totalPages > 1 && (
                                <div className="flex flex-wrap items-center justify-center gap-3 mt-16 pt-10 border-t border-slate-100">
                                    <Button variant="outline" className="rounded-2xl h-11 w-11 p-0 border-slate-200 hover:bg-white hover:text-green-600 transition-colors" asChild disabled={filters.page === 1}>
                                        <Link href={getQueryPath({ page: filters.page! - 1 })}><ChevronLeft className="h-5 w-5" /></Link>
                                    </Button>

                                    <div className="flex items-center gap-2">
                                        {[...Array(pagination.totalPages)].map((_, i) => (
                                            <Link
                                                key={i}
                                                href={getQueryPath({ page: i + 1 })}
                                                className={`min-w-[44px] h-11 flex items-center justify-center rounded-2xl text-sm font-bold transition-all ${filters.page === i + 1
                                                    ? 'bg-green-600 text-white shadow-lg shadow-green-100'
                                                    : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'
                                                    }`}
                                            >
                                                {i + 1}
                                            </Link>
                                        ))}
                                    </div>

                                    <Button variant="outline" className="rounded-2xl h-11 w-11 p-0 border-slate-200 hover:bg-white hover:text-green-600 transition-colors" asChild disabled={filters.page === pagination.totalPages}>
                                        <Link href={getQueryPath({ page: filters.page! + 1 })}><ChevronRight className="h-5 w-5" /></Link>
                                    </Button>
                                </div>
                            )}
                        </Suspense>
                    </div>
                </div>
            </main>
        </div>
    );
}