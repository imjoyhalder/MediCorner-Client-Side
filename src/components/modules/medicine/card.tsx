'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Medicine } from "@/types/medicine";
import { addToCart } from "@/actions/cart.action";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { ShoppingCart, Eye, Pill, Factory, Loader2 } from "lucide-react";

interface MedicineCardProps {
    medicine: Medicine;
}

export function MedicineCard({ medicine }: MedicineCardProps) {
    const [loading, setLoading] = useState(false);
    const seller = medicine.sellers?.[0];
    const hasStock = seller && seller.stockQuantity > 0;

    const handleAddToCart = async () => {
        if (!hasStock) return toast.error("Out of stock");

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
        <Card className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:border-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.12)]">

            {/* IMAGE - Aspect ratio optimized for compact view */}
            <CardHeader className="p-0 relative">
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image
                        fill
                        src={medicine.thumbnail || "/Kerfin7-NEA-2139.jpg"}
                        alt={medicine.name}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                {!hasStock && (
                    <Badge className="absolute top-2 right-2 font-bold text-[10px] px-1.5 h-5" variant="destructive">
                        Out of Stock
                    </Badge>
                )}
            </CardHeader>

            {/* CONTENT - Side by Side Layout */}
            <CardContent className="px-3 pt-2 pb-1">
                {/* Title and Price Side by Side */}
                <div className="flex justify-between items-start gap-2 mb-1">
                    <h3 className="text-sm font-bold text-slate-800 line-clamp-2 group-hover:text-green-600 flex-1 leading-snug">
                        {medicine.name}
                    </h3>
                    <div className="text-right shrink-0">
                        <span className="text-lg font-black text-slate-900">৳{seller?.price || "0"}</span>
                        <p className="text-[9px] uppercase text-slate-400 font-bold -mt-1">/pc</p>
                    </div>
                </div>

                {/* Generic & Brand Side by Side */}
                <div className="grid grid-cols-2 gap-2 border-t border-slate-50 pt-1.5">
                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <Pill className="h-3 w-3 text-green-500 shrink-0" />
                        <span className="line-clamp-1">{medicine.genericName}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 justify-end">
                        <Factory className="h-3 w-3 shrink-0" />
                        <span className="line-clamp-1 text-right">
                            {medicine.manufacturer || "N/A"}
                        </span>
                    </div>
                </div>
            </CardContent>

            {/* ACTIONS - Compact buttons */}
            <CardFooter className="flex gap-1.5 p-3 pt-1">
                <Button
                    variant="outline"
                    asChild
                    className="flex-1 h-9 rounded-xl text-xs border-slate-200"
                >
                    <Link href={`/medicine/${medicine.id}`}>
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        View
                    </Link>
                </Button>

                <Button
                    onClick={handleAddToCart}
                    disabled={loading || !hasStock}
                    className="flex-[1.5] h-9 rounded-xl bg-green-600 hover:bg-green-700 text-xs font-bold text-white active:scale-95"
                >
                    {loading ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                        <>
                            <ShoppingCart className="h-3.5 w-3.5 mr-1" />
                            Add to Cart
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}