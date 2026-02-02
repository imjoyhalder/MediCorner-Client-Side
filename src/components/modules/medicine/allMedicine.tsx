"use client";

import { useEffect, useState } from "react";
import { Medicine, Category, MedicineFilters } from "@/types/medicine";
import { MedicineServices } from "@/services/medecine.service";
import { FilterSort } from "./filters";
import { MedicineCard } from "./card";
import { userService } from "@/services/user.service";


export default function AllMedicinesPage() {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [manufacturers, setManufacturers] = useState<string[]>([]);
    const [filters, setFilters] = useState<MedicineFilters>({ page: 1, limit: 20 });
    const [loading, setLoading] = useState(true);

    // Fetch categories + manufacturers on mount
    useEffect(() => {
        const fetchMeta = async () => {
            const catRes = await MedicineServices.getCategories();
            if (catRes.data) setCategories(catRes.data);

            const manRes = await MedicineServices.getManufacturers();
            if (manRes.data) setManufacturers(manRes.data);
        };
        fetchMeta();
    }, []);

    const session = userService.getSession()
    console.log(session);
    // Fetch medicines whenever filters change
    useEffect(() => {
        const fetchMedicines = async () => {
            setLoading(true);
            const res = await MedicineServices.getAllMedicine(filters);
            setLoading(false);
            if (res.data) setMedicines(res.data.data);
        };
        fetchMedicines();
    }, [filters]);

    if (loading) return <p className="p-6 text-center text-gray-500">Loading medicines...</p>;

    return (
        <div className="bg-background min-h-screen p-6">
            <h1 className="text-4xl font-bold text-primary mb-6">
                Browse All Available Medicines
            </h1>

            {/* <FilterSort
                categories={categories}
                manufacturers={manufacturers}
                minPrice={0}
                maxPrice={10000}
                currentFilters={filters}
                onChange={(f) => setFilters({ ...filters, ...f })}
            /> */}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {medicines.length ? (
                    medicines.map((med: Medicine) => <MedicineCard key={med.id} medicine={med} />)
                ) : (
                    <p className="col-span-full text-center text-gray-500">No medicines found.</p>
                )}
            </div>
        </div>
    );
}
