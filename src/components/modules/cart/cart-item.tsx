
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { useState } from "react";

import { toast } from "sonner";
import { removeFromCart, updateCartQuantity } from "@/services/cart.service";

export interface CartItem {
    id: string;
    title: string;
    variant: string;
    size: string;
    quantity: number;
    image: string;
    in_stock: boolean;
    sellerMedicineId: string;
    sellerMedicine: {
        medicine: {
            name: string,
            genericName: string,
            thumbnail: string
        },
        price: number
    }
}

export function CartListItem({ item, refreshCart }: { item: CartItem; refreshCart: () => void }) {
    const [qty, setQty] = useState(item.quantity);
    const [loading, setLoading] = useState(false);

    const medicine = item.sellerMedicine.medicine;

    const inc = async () => {
        // if (!item.in_stock || loading) return;

        const newQty = qty + 1;
        setLoading(true);

        const toastId = toast.loading("Updating quantity...");

        try {
            const res = await updateCartQuantity({
                sellerMedicineId: item.sellerMedicineId,
                quantity: newQty,
            });

            if (!res.success) {
                toast.error(res.message, { id: toastId });
                return;
            }

            setQty(newQty);
            refreshCart();
            toast.success(res.message || "Quantity updated", { id: toastId });

        } catch (error) {
            toast.error("Something went wrong", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    const dec = async () => {
        if (qty <= 1 || loading) return;

        const newQty = qty - 1;
        setLoading(true);

        const toastId = toast.loading("Updating quantity...");

        try {
            const res = await updateCartQuantity({
                sellerMedicineId: item.sellerMedicineId,
                quantity: newQty,
            });

            if (!res.success) {
                toast.error(res.message, { id: toastId });
                return;
            }

            setQty(newQty);
            refreshCart();
            toast.success(res.message || "Quantity updated", { id: toastId });

        } catch (error) {
            toast.error("Something went wrong", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    const removeItem = async () => {
        if (loading) return;

        setLoading(true);
        const toastId = toast.loading("Removing item...");

        try {
            const res = await removeFromCart(item.id);

            if (!res.success) {
                toast.error(res.message, { id: toastId });
                return;
            }

            refreshCart();
            toast.success(res.message || "Item removed", { id: toastId });

        } catch (error) {
            toast.error("Failed to remove item", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex gap-4">
            <Image src={'/Kerfin7-NEA-2139.jpg'} width={64} height={64} alt={item.title} className="h-16 w-16 rounded-md border object-cover" unoptimized />
            <div className="flex flex-1 justify-between">
                <div className="space-y-1">
                    <h3 className="text-sm font-medium text-[#0f172a]">{medicine.name}</h3>
                    {/* <p className="text-xs text-muted-foreground">{item.variant} • {item.size}</p> */}
                    <p className="text-sm font-semibold text-green-500">৳{item.sellerMedicine.price}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center space-x-1">
                        <Button variant="outline" size="icon" className="p-1" onClick={dec}><Minus className="h-3 w-3" /></Button>
                        <span className="w-6 text-center text-sm">{qty}</span>
                        <Button variant="outline" size="icon" className="p-1" onClick={inc}><Plus className="h-3 w-3" /></Button>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={removeItem}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove item</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
