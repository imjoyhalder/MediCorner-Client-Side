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
