
'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Medicine } from "@/types/medicine";
import { addToCart } from "@/actions/cart.action";
import { toast } from "sonner";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Lucide Icons
import { ShoppingCart, Eye, Pill, Factory, Loader2 } from "lucide-react";

interface MedicineCardProps {
    medicine: Medicine;
}

export function MedicineCard({ medicine }: MedicineCardProps) {
    const [loading, setLoading] = useState(false);
    const seller = medicine.sellers[0];
    const hasStock = seller && seller.stockQuantity > 0;

    const handleAddToCart = async () => {
        if (!hasStock) {
            return toast.error("Out of stock");
        }

        setLoading(true);
        const res = await addToCart(seller.id, 1);
        setLoading(false);

        if (!res.success) {
            toast.warning("Please login to add to cart!");
            return;
        }

        toast.success(res.message);
    };

    return (
        <Card className="group overflow-hidden border-slate-200 transition-all duration-300 hover:shadow-lg hover:border-green-400 bg-white">
            {/* Image Container */}
            <CardHeader className="p-0 relative">
                <div className="h-40 w-full bg-slate-50 flex items-center justify-center overflow-hidden">
                    <Image
                        width={300}
                        height={250}
                        src={medicine.thumbnail || "/hero-image.png"}
                        alt={medicine.name}
                        className="h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
                {!hasStock && (
                    <Badge variant="destructive" className="absolute top-2 right-2">
                        Out of Stock
                    </Badge>
                )}
            </CardHeader>

            {/* Product Details */}
            <CardContent className="pt-0 pl-2 space-y-2">
                <div className="space-y-1">
                    <h3 className="font-bold text-lg text-slate-800 line-clamp-1 group-hover:text-green-600 transition-colors">
                        {medicine.name}
                    </h3>
                    <div className="flex items-center text-xs text-slate-500 gap-1">
                        <Pill className="h-3 w-3" />
                        <span className="line-clamp-1">{medicine.genericName}</span>
                    </div>
                    <div className="flex items-center text-xs text-slate-400 gap-1">
                        <Factory className="h-3 w-3" />
                        <span>{medicine.manufacturer || "N/A"}</span>
                    </div>
                </div>

                <div className="pt-0">
                    <span className="text-xl font-bold text-slate-900">
                        ৳{seller?.price || "0"}
                    </span>
                </div>
            </CardContent>

            {/* Actions */}
            <CardFooter className="p-2 pt-0 grid grid-cols-5 gap-2">
                <Button
                    variant="outline"
                    asChild
                    className="col-span-2 border-slate-200 hover:bg-slate-50 hover:text-green-600"
                >
                    <Link href={`/medicine/${medicine.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                    </Link>
                </Button>

                <Button
                    className="col-span-3 bg-green-600 hover:bg-green-700 shadow-sm transition-all active:scale-95"
                    onClick={handleAddToCart}
                    disabled={loading || !hasStock}
                >
                    {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <>
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}