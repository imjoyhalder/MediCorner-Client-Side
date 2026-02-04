export interface AdminStatisticsData {
    usersVsSellers: {
        users: number;
        sellers: number;
    };
    ordersOverTime: {
        date: string;
        count: number;
    }[];
    revenueOverTime: {
        date: string;
        revenue: number;
    }[];
    totalRevenue: number;
    pendingOrders: number;
    topMedicines: {
        name: string;
        value: number;
    }[];
}