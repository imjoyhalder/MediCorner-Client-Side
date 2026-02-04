export interface OrderOverTime {
    [date: string]: number;
}

export interface RevenuePerMedicine {
    [medicineName: string]: number;
}

export interface StockPerMedicine {
    [medicineName: string]: number;
}

export interface SellerStatistics {
    ordersOverTime: OrderOverTime;
    revenuePerMedicine: RevenuePerMedicine;
    stockPerMedicine: StockPerMedicine;
}

export interface SellerStatsSummary {
    totalMedicines: number;
    totalOrders: number;
    totalRevenue: number;
    totalReviews: number;
    averageRating: number;
}

export interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T | null;
}



export interface SellerMedicine {
    medicineId: string;               // Medicine ID
    sellerMedicineId: string; // Seller-specific junction ID
    medicineName: string;
    brandName: string;
    genericName: string;
    manufacturer: string;
    description?: string;
    price: number;
    stockQuantity: number;
    batchNumber: string;
    // categoryName?: string;    
    createdAt?: string;
    updatedAt?: string;
}

export interface UpdateMedicinePayload {
    name?: string;
    brandName?: string;
    genericName?: string | null;
    manufacturer?: string | null;
    description?: string | null;
    price?: number;
    stockQuantity?: number;
    batchNumber?: string;
    isAvailable?: boolean;
}