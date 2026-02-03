
import { env } from "@/env";
import { Category, Medicine } from "@/types/medicine";

export interface MedicineFilters {
    search?: string;
    categoryId?: string;
    manufacturer?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface MedicineResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: Medicine[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export const MedicineServices = {
    // getAllMedicine: async (filters: MedicineFilters): Promise<{ data: MedicineResponse | null; error: string | null }> => {
    //     try {
    //         const params = new URLSearchParams();

    //         (Object.keys(filters) as Array<keyof MedicineFilters>).forEach((key) => {
    //             const value = filters[key];
    //             if (value !== undefined && value !== null && value !== "" && value !== "all") {
    //                 params.append(key, value.toString());
    //             }
    //         });

    //         const res = await fetch(`${env.BACKEND_URL}/medicine?${params.toString()}`, {
    //             next: { revalidate: 10 }
    //         });

    //         const result: MedicineResponse = await res.json();

    //         if (!res.ok) {
    //             throw new Error(result.message || "Failed to fetch medicines");
    //         }

    //         return { data: result, error: null };
    //     } catch (error) {
    //         const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    //         return { data: null, error: errorMessage };
    //     }
    // },

    getAllMedicine: async (filters: MedicineFilters): Promise<{ data: MedicineResponse | null; error: string | null }> => {
        try {
            const params = new URLSearchParams();
            (Object.keys(filters) as Array<keyof MedicineFilters>).forEach((key) => {
                const value = filters[key];
                if (value !== undefined && value !== null && value !== "" && value !== "all") {
                    params.append(key, value.toString());
                }
            });

            const res = await fetch(`${env.BACKEND_URL}/medicine?${params.toString()}`, { next: { revalidate: 10 } });
            const result: MedicineResponse = await res.json();
            return res.ok ? { data: result, error: null } : { data: null, error: result.message };
        } catch {
            return { data: null, error: "Failed to fetch medicines" };
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