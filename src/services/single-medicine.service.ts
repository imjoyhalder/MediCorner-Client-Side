'use server'
import { env } from "@/env";

export async function getSingleMedicine(id: string) {
    try {

        const res = await fetch(`${env.BACKEND_URL}/medicine/${id}`, {
            headers: {
                'Application-Type': 'application/json'
            }
        }
        )
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