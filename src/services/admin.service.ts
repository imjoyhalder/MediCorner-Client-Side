import { env } from "@/env"

export const adminServices = {
    getStatistics: async () => {
        try {
            const res = await fetch(`${env.BACKEND_URL}/admin/statistics`)
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