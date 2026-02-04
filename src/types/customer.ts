// import { OrderStatus } from "./order";

import { OrderStatus } from "./order";

// export interface MedicineItem {
//     name: string;
//     medicineId: string;
//     price: number;
//     quantity: number;
//     itemStatus: OrderStatus;
//     sellerId: string;
// }

// export interface CustomerOrder {
//     orderId: string;
//     status: OrderStatus;
//     total: number;
//     createdAt: string;
//     medicines: MedicineItem[];
// }

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    image?: string ;
    phone?: string ;
}

export interface OrderMedicine {
    medicineId: string;
    name: string;
    price: number;
    quantity: number;
}

export interface CustomerOrder {
    orderId: string;
    status: OrderStatus;
    total: number;
    createdAt: string; 
    medicines: OrderMedicine[];
}

export interface ProfileUpdatePayload {
    name?: string;
    phone?: string;
    image?: string;
}

export interface UserSession {
    id: string;
    name: string;
    email: string;
    phone?: string;
    image?: string;
}