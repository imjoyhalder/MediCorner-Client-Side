export interface Category {
    id: string;
    name: string;
    slug: string;
}

export interface Seller {
    id: string
    price: number;
    expiryDate: string;
    stockQuantity: number;
    sellerId: string;
}

export interface Medicine {
    id: string;
    name: string;
    brandName: string;
    genericName?: string;
    manufacturer?: string;
    description?: string;
    isOtc: boolean;
    thumbnail?: string | null;
    categoryId: string;
    category: Category;
    sellers: Seller[];
    reviews: Review[];
}

export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface MedicineResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: Medicine[];
    pagination: Pagination;
}


export interface MedicineFilters {
    search?: string;
    page?: number;
    limit?: number;
    manufacturer?: string;
    categoryId?: string; 
    minPrice?: number;
    maxPrice?: number;
    isOtc?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface Review {
    id: string;
    rating: number | null;
    comment: string;
    userId: string;
    medicineId: string;
    createdAt: string;
}

export interface CreateMedicinePayload {
    name: string;
    brandName: string;
    genericName?: string;
    manufacturer?: string;
    description?: string;
    categoryId: string;
    price: number;
    stockQuantity: number;
    batchNumber: string;
    expiryDate?: Date;
}