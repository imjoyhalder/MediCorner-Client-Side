'use server'
import { env } from "@/env";
import { cookies } from "next/headers";

export async function getStatisticsForAdminDashboard() {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${env.BACKEND_URL}/admin/statistics`, {
            headers: {
                Cookie: cookieStore.toString(),
            },
            cache: "no-store",
        });

        const data = await res.json();

        if (!data?.success) {
            return { data: null, error: "Statistics fetch failed" };
        }

        return { data: data.data, error: null };
    } catch {
        return { data: null, error: "Statistics fetch failed" };
    }
}

export async function getAllUserForAdmin() {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${env.BACKEND_URL}/admin/users`, {
            headers: {
                "Cookie": cookieStore.toString(),
            },
            cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("API Error Status:", res.status);
        }

        if (!data?.result?.success) {
            return { data: null, error: data.message || "User fetch failed" };
        }

        return { data: data?.result?.data, error: null };
    } catch (error) {
        console.error("Fetch Error:", error);
        return { data: null, error: "Network error occurred" };
    }
}

export async function banUser(userId: string) {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${env.BACKEND_URL}/admin/ban/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            cache: "no-store",
        });

        const data = await res.json();
        console.log(data);

        if (!data?.result.success) {
            return {
                success: false,
                message: data?.result?.message || "Failed to ban user"
            };
        }

        return {
            success: true,
            message: data?.result?.message,
            data: data.result
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Internal server error"
        };
    }
}