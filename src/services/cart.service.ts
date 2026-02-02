"use server";

import { env } from "@/env";
import { cookies } from "next/headers";
import { userService } from "./user.service";

export async function addToCart(
    sellerMedicineId: string,
    quantity: number
) {
    try {
        const cookieStore = await cookies();
        

        console.log('this is from cart service');
        const res = await fetch(`${env.BACKEND_URL}/cart/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            body: JSON.stringify({ sellerMedicineId, quantity }),
            cache: "no-store",
        });


        const data = await res.json();
        console.log(data);

        if (!res.ok || !data.success) {
            throw new Error(data.message || "Failed to add to cart");
        }

        return {
            success: true,
            message: data.message,
        };
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
        };
    }
}
