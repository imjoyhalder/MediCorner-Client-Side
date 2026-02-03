"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

export async function placeOrder(shippingAddress: string) {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${env.BACKEND_URL}/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            body: JSON.stringify({shippingAddress}),
            cache: "no-store",
        });

        const data = await res.json();
        console.log(data);
        if (!res.ok || !data.success) {
            return {
                success: false,
                message: data.message || "Failed to place order",
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

export async function getAllOrderForAdmin() {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${env.BACKEND_URL}/order/all/admin`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            next: { revalidate: 0 }, 
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            return {
                success: false,
                message: data.message || "Failed to fetch orders for admin",
            };
        }

        return {
            success: true,
            message: data.message,
            data: data.data,
        };

    } catch (error) {
        console.error("Admin Orders Fetch Error:", error);
        return { 
            success: false, 
            message: "Something went wrong while fetching orders" 
        };
    }
}