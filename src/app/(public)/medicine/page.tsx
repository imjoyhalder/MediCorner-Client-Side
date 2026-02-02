
import { Metadata } from "next";
import { MedicineFilters as FilterType } from "@/types/medicine";
import { Filter, Search } from "lucide-react";
import { MedicineServices } from "@/services/medecine.service";
import { MedicineSearchBar } from "@/components/modules/medicine/search-bar";
import { MedicineFilters } from "@/components/modules/medicine/medicineFilters";
import { MedicineCard } from "@/components/modules/medicine/card";
// import { MedicinePagination } from "@/components/modules/medicine/medicinePagination";
import { SortOptions } from "@/components/modules/medicine/sort-options";

export const metadata: Metadata = {
    title: "Browse All Medicines | MediCorner",
    description: "Search and browse through thousands of medicines. Filter by category, price, manufacturer and more.",
};

interface MedicinesPageProps {
    searchParams: {
        search?: string;
        page?: string;
        limit?: string;
        manufacturer?: string;
        category?: string;
        minPrice?: string;
        maxPrice?: string;
        isOtc?: string;
        sortBy?: string;
    };
}

export default async function MedicinesPage({ searchParams }: MedicinesPageProps) {
    // Parse search params
    const filters: FilterType = {
        search: await searchParams.search,
        page: searchParams.page ? parseInt(searchParams.page) : 1,
        limit: searchParams.limit ? parseInt(searchParams.limit) : 12,
        manufacturer: searchParams.manufacturer,
        category: searchParams.category,
        minPrice: searchParams.minPrice ? parseInt(searchParams.minPrice) : undefined,
        maxPrice: searchParams.maxPrice ? parseInt(searchParams.maxPrice) : undefined,
        isOtc: searchParams.isOtc === "true",
        // sortBy: searchParams.sortBy || "name-asc",
    };

    // Fetch medicines with filters
    const { data: medicinesData, error: medicinesError } = await MedicineServices.getAllMedicine(filters);

    // Fetch categories and manufacturers
    const { data: categories, error: categoriesError } = await MedicineServices.getCategories();
    const { data: manufacturers, error: manufacturersError } = await MedicineServices.getManufacturers();

    // Handle errors
    if (medicinesError || categoriesError || manufacturersError) {
        console.error("Error fetching data:", {
            medicines: medicinesError,
            categories: categoriesError,
            manufacturers: manufacturersError,
        });
    }

    // Extract data or use defaults
    const medicines = medicinesData?.data || [];
    const pagination = medicinesData?.pagination || { total: 0, page: 1, limit: 12, totalPages: 0 };
    const allCategories = categories || [];
    const allManufacturers = manufacturers || [];

    // Calculate price range from medicines
    const allPrices = medicines.flatMap(med => med.sellers.map(s => s.price));
    const minPrice = allPrices.length > 0 ? Math.min(...allPrices) : 0;
    const maxPrice = allPrices.length > 0 ? Math.max(...allPrices) : 10000;

    const activeFiltersCount = [
        searchParams.search,
        searchParams.manufacturer,
        searchParams.category,
        searchParams.minPrice,
        searchParams.maxPrice,
        searchParams.isOtc,
        searchParams.sortBy,
    ].filter(Boolean).length;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Browse All Medicines
                        </h1>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                            Search and filter through thousands of medicines by category, price, manufacturer, and more.
                        </p>
                        <MedicineSearchBar initialSearch={searchParams.search || ""} />
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar - Hidden on mobile, show with button */}
                    <div className="lg:w-64 flex-shrink-0">
                        <div className="sticky top-24">
                            <MedicineFilters
                                categories={allCategories}
                                manufacturers={allManufacturers}
                                minPrice={minPrice}
                                maxPrice={maxPrice}
                            />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Results Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {medicines.length > 0 ? "Available Medicines" : "No Medicines Found"}
                                </h2>
                                <p className="text-gray-600 mt-1">
                                    {pagination.total} {pagination.total === 1 ? "medicine" : "medicines"} found
                                    {activeFiltersCount > 0 && ` • ${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} active`}
                                </p>
                            </div>
                            <SortOptions />
                        </div>

                        {/* Results Grid or Empty State */}
                        {medicines.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {medicines.map((medicine) => (
                                        <MedicineCard key={medicine.id} medicine={medicine} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {pagination.totalPages > 1 && (
                                    <MedicinePagination pagination={pagination} />
                                )}
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                                    <Search className="h-12 w-12 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    No medicines found
                                </h3>
                                <p className="text-gray-600 max-w-md mx-auto">
                                    Try adjusting your search or filter to find what you are looking for.
                                </p>
                                <button
                                    onClick={() => window.location.href = '/medicines'}
                                    className="mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-600 transition"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white border-t py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Filter className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Advanced Filtering</h3>
                            <p className="text-gray-600">Filter by category, manufacturer, price range, and OTC status.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Verified Products</h3>
                            <p className="text-gray-600">All medicines are verified and sourced from trusted manufacturers.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Quick Delivery</h3>
                            <p className="text-gray-600">Fast and reliable delivery to your doorstep.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}