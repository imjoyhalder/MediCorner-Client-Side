import { env } from "@/env"
import { cookies } from "next/headers";

export const adminServices = {
    getStatistics: async () => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${env.BACKEND_URL}/admin/statistics`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            })
            const data = await res.json()
            if (!data) {
                return { data: null, error: "statistics data fetch failed!" }
            }
            return { data: data, error: null }
        } catch (error) {
            return { data: null, error: "statistics data fetch failed!" }
        }

    }
}