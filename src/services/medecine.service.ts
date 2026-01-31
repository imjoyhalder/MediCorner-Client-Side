import { env } from "@/env"

export const MedicineServices = {
    getAllMedicine: async () => {
        try {
            const res = await fetch(`${env.API_URL}/medicine`)
            const data = res.json()
            if (!data) {
                return { data: null, error: "category data fetch failed!" }
            }
            return { data: data, error: null }
        } catch (error) {
            return { data: null, error: "category data fetch failed!" }
        }
    }
}