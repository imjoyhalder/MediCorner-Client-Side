"use client";

import { useEffect, useState } from "react";
import { Medicine } from "@/types/medicine";
import { MedicineServices } from "@/services/medecine.service";
import { MedicineCard } from "./card";

export default function AllMedicinesPage() {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMedicines = async () => {
            setLoading(true);
            const res = await MedicineServices.getAllMedicine({ page: 1, limit: 20 });
            setLoading(false);
            if (res.data) setMedicines(res.data.data);
        };
        fetchMedicines();
    }, []);

    if (loading) return <p>Loading medicines...</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-background">
            {medicines.map((med) => (
                <MedicineCard key={med.id} medicine={med} />
            ))}
        </div>
    );
}

