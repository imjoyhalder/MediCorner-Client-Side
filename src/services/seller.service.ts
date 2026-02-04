'use server'
import { cookies } from "next/headers";
import { env } from "@/env";
import { ApiResponse, SellerMedicine, UpdateMedicinePayload } from "@/types/seller";
import { CreateMedicinePayload } from "@/types/medicine";
import { OrderStatus, SellerOrder } from "@/types/order";


export async function getSellerStatistics() {
    try {
        const cookieStore = await cookies();
        const res = await fetch(`${env.BACKEND_URL}/seller/statistics`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            next: { revalidate: 0 },
        });

        const data = await res.json();
        return data; // success, message, data (ordersOverTime, revenuePerMedicine, etc.)
    } catch (error) {
        return { success: false, message: "Failed to fetch chart data" };
    }
}


export async function getSellerStatsSummary() {
    try {
        const cookieStore = await cookies();
        const res = await fetch(`${env.BACKEND_URL}/seller/stats`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            next: { revalidate: 0 },
        });

        const data = await res.json();
        return data; // success, data (totalRevenue, totalOrders, etc.)
    } catch (error) {
        return { success: false, message: "Failed to fetch stats summary" };
    }
}

export async function getSellerMedicines(): Promise<ApiResponse<SellerMedicine[]>> {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${env.BACKEND_URL}/seller/medicine`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            next: { revalidate: 0 },
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to fetch medicines");
        }

        return data;
    } catch (error) {
        console.error("Medicine Fetch Error:", error);
        return {
            success: false,
            statusCode: 500,
            message: "Something went wrong while fetching medicines",
            data: [],
        };
    }
}

export async function updateMedicine(
    medicineId: string,
    payload: UpdateMedicinePayload): Promise<ApiResponse<UpdateMedicinePayload>> {
    const cookieStore = await cookies();

    try {
        const res = await fetch(`${env.BACKEND_URL}/medicine/${medicineId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            body: JSON.stringify(payload),
        });

        const result = await res.json();

        if (!res.ok || !result.success) {
            throw new Error(result.message || "Failed to update medicine");
        }

        return result;
    } catch (error) {
        console.error("Update Medicine Error:", error);
        return {
            success: false,
            statusCode: 500,
            message: error instanceof Error ? error.message : "Internal Server Error",
            data: null,
        };
    }
}

export async function deleteMedicine(medicineId: string): Promise<ApiResponse<null>> {
    const cookieStore = await cookies();
    const res = await fetch(`${env.BACKEND_URL}/medicine/${medicineId}`, {
        method: "DELETE",
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    return res.json();
}

export async function addMedicine(payload: CreateMedicinePayload): Promise<ApiResponse<CreateMedicinePayload>> {
    const cookieStore = await cookies();
    const res = await fetch(`${env.BACKEND_URL}/medicine`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
    });
    return res.json();
}

export async function getSellerOrders(): Promise<ApiResponse<SellerOrder[]>> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        const res = await fetch(`${env.BACKEND_URL}/order/seller`, {
            cache: "no-store",
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            return {
                success: false,
                statusCode: res.status,
                message: errorData.message || "Failed to fetch orders",
                data: [],
            };
        }

        return await res.json();
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: "Network error occurred while fetching orders",
            data: [],
        };
    }
}

export async function updateOrderBatchStatus(
    orderId: string,
    status: OrderStatus
): Promise<ApiResponse<null>> {
    try {
        const cookieStore = await cookies();
        const res = await fetch(`${env.BACKEND_URL}/order/seller/batch-status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            body: JSON.stringify({ orderId, status }),
        });

        const result = await res.json();
        console.log('update order status', result);
        if (!res.ok) {
            return {
                success: false,
                statusCode: res.status,
                message: result.message || "Failed to update status",
                data: null,
            };
        }

        return result;
    } catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: "Network error occurred while updating status",
            data: null,
        };
    }
}