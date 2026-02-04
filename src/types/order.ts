export type OrderStatus = 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface AdminOrder {
    orderId: string;
    orderDate: string; // ISO Date String
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    productName: string;
    brandName: string;
    thumbnail: string | null;
    sellerName: string;
    sellerEmail: string;
    quantity: number;
    unitPrice: number;
    subTotal: number;
    orderTotal: number;
    shippingAddress: string;
    paymentMethod: string;
    itemStatus: OrderStatus;
    overallStatus: OrderStatus;
}

export interface AdminOrderResponse {
    success: boolean;
    message: string;
    data: AdminOrder[];
}


export interface SellerMedicineInfo {
    id: string;
    medicine: {
        id: string;
        name: string;
        brandName: string;
        manufacturer: string | null;
    };
}

export interface OrderItemDetail {
    id: string;
    price: number;
    quantity: number;
    status: OrderStatus;
    sellerMedicine: SellerMedicineInfo;
}

export interface CustomerInfo {
    name: string;
    email: string;
    phone: string | null;
    image: string | null;
}

export interface SellerOrder {
    id: string;
    total: number;
    status: OrderStatus;
    shippingAddress: string;
    paymentMethod: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    user: CustomerInfo;
    items: OrderItemDetail[];

    sellerSubtotal: number;
    batchStatus: OrderStatus | "MIXED";
    itemCount: number;
}