
"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

export async function addToCart(sellerMedicineId: string, quantity: number) {
    try {
        const cookieStore = await cookies(); // Next.js 15 update

        const res = await fetch(`${env.BACKEND_URL}/cart/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            body: JSON.stringify({ sellerMedicineId, quantity }),
        });

        const data = await res.json();

        if (!res.ok) return { success: false, message: data.message };
        return { success: true, message: data.message };

    } catch (error) {
        return { success: false, message: "Something went wrong" };
    }
}