
import { env } from "@/env";
import { MedicineResponse, MedicineFilters, Category } from "@/types/medicine";


export const MedicineServices = {
    getAllMedicine: async (filters?: MedicineFilters): Promise<{ data: MedicineResponse | null; error: string | null }> => {
        try {
            const params = new URLSearchParams();
            Object.entries(filters || {}).forEach(([key, value]) => {
                if (value !== undefined && value !== null) params.append(key, value.toString());
            });

            const res = await fetch(`${env.BACKEND_URL}/medicine?${params.toString()}`, { next: { revalidate: 5 } });
            if (!res.ok) throw new Error(`API responded with status: ${res.status}`);
            const data: MedicineResponse = await res.json();
            return data.success ? { data, error: null } : { data: null, error: data.message };
        } catch (error) {
            console.error("Error fetching medicines:", error);
            return { data: null, error: "Failed to fetch medicine data." };
        }
    },

    getCategories: async (): Promise<{ data: Category[] | null; error: string | null }> => {
        try {
            const res = await fetch(`${env.BACKEND_URL}/categories`, { next: { revalidate: 60 } });
            if (!res.ok) throw new Error(`API responded with status: ${res.status}`);
            const data = await res.json();
            return data.success ? { data: data.data, error: null } : { data: null, error: data.message };
        } catch (error) {
            console.error("Error fetching categories:", error);
            return { data: null, error: "Failed to fetch categories." };
        }
    },

    getManufacturers: async (): Promise<{ data: string[] | null; error: string | null }> => {
        try {
            const res = await fetch(`${env.BACKEND_URL}/medicine/manufacturers`,
                { next: { revalidate: 3600 } });
            if (!res.ok) throw new Error(`API responded with status: ${res.status}`);
            const data = await res.json();
            return data.success ? { data: data.data, error: null } : { data: null, error: data.message };
        } catch (error) {
            console.error("Error fetching manufacturers:", error);
            return { data: null, error: "Failed to fetch manufacturer data." };
        }
    }
};

export async function getSingleMedicine(id: string) {
    try {
       
        const res = await fetch(`http://localhost:5000/api/v1/medicine/${id}`, {
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