import { env } from "@/env"
import { error } from "console"

export const CategoryServices = {
    getAllCategories: async () => {
        try {
            const category = await fetch(`${env.BACKEND_URL}/categories`)
            const data = await category.json()
            console.log(data);
            return {data: data, error: null}
        } catch (error) {
            return { data: null, error: "category data fetch failed!" }
        }
    }
}