"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

interface CartItemPayload {
    sellerMedicineId: string;
    quantity: number;
}


export async function getCart() {
    try {
        const cookieStore = await cookies();

        // console.log(cookieStore);

        const res = await fetch(`${env.BACKEND_URL}/cart`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            return {
                success: false,
                message: data?.message || "Failed to fetch cart",
            };
        }

        let totalPrice = 0;
        let totalItems = 0;

        for (const item of data.data.items) {
            totalPrice += item.quantity * item.sellerMedicine.price;
            totalItems += item.quantity;
        }

        return {
            success: true,
            message: data.message,
            data: {
                ...data.data,
                totalPrice,
                totalItems,
            },
        };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Something went wrong" };
    }
}


export async function updateCartQuantity({
    sellerMedicineId,
    quantity,
}: CartItemPayload) {
    try {
        if (quantity < 0) {
            return { success: false, message: "Quantity cannot be negative" };
        }

        const cookieStore = await cookies();

        const res = await fetch(`${env.BACKEND_URL}/cart`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            body: JSON.stringify({ sellerMedicineId, quantity }),
            cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            return {
                success: false,
                message: data.message || "Failed to update quantity",
            };
        }

        return {
            success: true,
            message: data.message,
            data: data.data,
        };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Something went wrong" };
    }
}


export async function removeFromCart(cartItemId: string) {
    try {
        const cookieStore = await cookies();
        const res = await fetch(`${env.BACKEND_URL}/cart`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            body: JSON.stringify({ cartItemId }),
            cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            return {
                success: false,
                message: data.message || "Failed to delete item",
            };
        }

        return {
            success: true,
            message: 'Item delete successfully',
            data: { cartItemId },
        };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Something went wrong" };
    }
}
