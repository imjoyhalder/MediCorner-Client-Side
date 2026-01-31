import { env } from "@/env"


export const CategoryServices = {
    getAllCategories: async () => {
        const res = await fetch(
            `${env.BACKEND_URL}/categories`,
            { next: { revalidate: 10 } }
        )
        return res.json()
    }
}