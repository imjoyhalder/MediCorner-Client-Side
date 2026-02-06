'use server'
import { env } from "@/env";
import { cookies } from "next/headers";

export const getMyOrders = async () => {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${env.BACKEND_URL}/order/my-orders`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            next: { revalidate: 1, tags: ["orders"] },
        });

        return await res.json();
    } catch (error) {
        return { success: false, message: "Network error while fetching orders" };
    }
};


export const cancelOrderAction = async (orderId: string) => {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${env.BACKEND_URL}/order/my-orders/cancel/${orderId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
        });

        return await res.json();
    } catch (error) {
        return { success: false, message: "Failed to cancel order" };
    }
};


// export const updateProfile = async (userData: { name?: string; phone?: string; image?: string }) => {
//     try {
//         const cookieStore = await cookies();

//         const res = await fetch(`${env.BACKEND_URL}/user/update-profile`, {
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json",
//                 Cookie: cookieStore.toString(),
//             },
//             body: JSON.stringify(userData),
//         });

//         return await res.json();
//     } catch (error) {
//         return { success: false, message: "Profile update failed" };
//     }
// };

export const updateProfile = async (userData: { name?: string; phone?: string; image?: string }) => {
    try {
        const cookieStore = await cookies();
        
        // নিশ্চিত করুন env.BACKEND_URL আপনার .env ফাইলে আছে
        const res = await fetch(`${process.env.BACKEND_URL}/user/update-profile`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                // Server action এ কুকি অটোমেটিক বা ম্যানুয়ালি পাস করতে হয়
                Cookie: cookieStore.toString(),
            },
            body: JSON.stringify(userData),
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Update Profile Error:", error);
        return { success: false, message: "Profile update failed" };
    }
};

export const getSingleCustomer = async () => {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${env.BACKEND_URL}/user/single-user`, {
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
        });
        return await res.json();
    } catch (error) {
        return { success: false, message: "User not found" };
    }
}