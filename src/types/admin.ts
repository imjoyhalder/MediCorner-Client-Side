export interface UsersVsSellers {
    users: number;
    sellers: number;
    total: number;
    pendingOrders: number;
}

export interface OrdersOverTime {
    [date: string]: number;
}

export interface RevenueOverTime {
    [date: string]: number;
}

export interface TopMedicines {
    [medicineName: string]: number;
}

export interface AdminStatisticsData {
    usersVsSellers: UsersVsSellers;
    ordersOverTime: OrdersOverTime;
    revenueOverTime: RevenueOverTime;
    topMedicines: TopMedicines;
    totalRevenue: number;
    pendingOrders: number;
}

export interface AdminStatisticsResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: AdminStatisticsData;
}
