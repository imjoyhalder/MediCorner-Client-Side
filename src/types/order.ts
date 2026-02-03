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