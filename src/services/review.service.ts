"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { env } from "@/env";

export interface Review {
    rating?: number;
    comment: string;
    medicineId: string;
}

export async function postReview(payload: Review) {
    try {
        const cookieStore = await cookies();
        
        const res = await fetch(`${env.BACKEND_URL}/review`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
                "Cookie": cookieStore.toString(),
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            return {
                success: false,
                message: data.message || "Failed to post review",
            };
        }

        revalidatePath(`/medicine/${payload.medicineId}`);

        return {
            success: true,
            message: data.message || "Review posted successfully",
            data: data.data,
        };

    } catch (error) {
        console.error("POST_REVIEW_ERROR:", error);
        return { success: false, message: "Something went wrong" };
    }
}