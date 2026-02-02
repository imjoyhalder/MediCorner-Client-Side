
'use client';

import { Medicine } from "@/types/medicine";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";
import { addToCart } from "@/actions/cart.action";
import Link from "next/link";

interface MedicineCardProps {
    medicine: Medicine;
}

export function MedicineCard({ medicine }: MedicineCardProps) {
    const [loading, setLoading] = useState(false);

    const handleAddToCart = async () => {
        if (!medicine.sellers.length) {
            return toast.error("No stock available");
        }

        setLoading(true);

        const sellerMedicineId = medicine.sellers[0].id;
        const res = await addToCart(sellerMedicineId, 1);

        setLoading(false);

        if (!res.success) {
            toast.warning("Please login for add to cart!");
            return;
        }

        toast.success(res.message);
    };

    return (
        <div className="bg-white rounded-xl border shadow-sm p-4 flex flex-col">
            <div className="h-40 w-full bg-gray-100 flex items-center justify-center rounded-lg mb-4">
                <Image
                    width={300}
                    height={250}
                    src={medicine.thumbnail || "/herb-capsule-infographic.png"}
                    alt={medicine.name}
                    className="h-full object-contain"
                />
            </div>

            <h3 className="text-lg font-semibold text-primary">
                {medicine.brandName}
            </h3>
            <p className="text-gray-700 text-sm mb-2">
                {medicine.genericName}
            </p>
            <p className="text-gray-500 text-sm mb-2">
                Manufacturer: {medicine.manufacturer || "N/A"}
            </p>
            <p className="text-gray-900 font-semibold mb-4">
                ৳{medicine.sellers[0]?.price || "0"}
            </p>
            <Button className="mb-2">
                <Link href={`medicine/${medicine.id}`}>view</Link>
            </Button>
            <Button
                className="bg-green-500 hover:bg-green-600"
                onClick={handleAddToCart}
                disabled={loading}
            >
                {loading ? "Adding..." : "Add to Cart"}
            </Button>
        </div>
    );
}
