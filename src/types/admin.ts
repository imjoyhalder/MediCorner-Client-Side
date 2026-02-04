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
