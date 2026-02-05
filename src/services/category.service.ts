'use server';

import { cookies } from "next/headers";
import { env } from "@/env";


export async function getAllCategories() {
    try {
        const res = await fetch(`${env.BACKEND_URL}/categories`, {
            method: "GET",
            cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
            return { data: null, error: data.message || "Failed to fetch categories" };
        }

        return { data: data?.data, error: null };

    } catch (error) {
        return { data: null, error: "Network error occurred" };
    }
}


export async function getSingleCategory(id: string) {
    try {
        const res = await fetch(`${env.BACKEND_URL}/categories/${id}`, {
            method: "GET",
            cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
            return { data: null, error: data.message || "Category not found" };
        }

        return { data: data?.data, error: null };
    } catch (error) {
        return { data: null, error: "Something went wrong" };
    }
}


export async function createCategory(payload: { name: string; slug: string }) {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${env.BACKEND_URL}/categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": cookieStore.toString(),
            },
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
            return { success: false, message: data.message || "Failed to create category" };
        }

        return { success: true, message: data.message, data: data.data };
    } catch (error) {
        return { success: false, message: "Network error occurred" };
    }
}

export async function deleteCategory(id: string) {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${env.BACKEND_URL}/categories/${id}`, {
            method: "DELETE",
            headers: {
                "Cookie": cookieStore.toString(),
            },
        });

        const data = await res.json();

        if (!res.ok) {
            return { success: false, message: data.message || "Failed to delete category" };
        }

        return { success: true, message: data.message };
    } catch (error) {
        return { success: false, message: "Network error occurred" };
    }
}