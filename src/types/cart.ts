export interface CartItem {
    id: string;
    quantity: number;
    sellerMedicineId: string;
    sellerMedicine: {
        id: string;
        price: number;
        stockQuantity: number;
        medicine: {
            id: string;
            name: string;
            brandName: string;
            genericName: string;
            manufacturer: string;
            thumbnail: string | null;
        };
        seller: {
            id: string;
            name: string;
        };
    };
}

export interface Cart {
    id: string;
    userId: string;
    items: CartItem[];
    createdAt: string;
    updatedAt: string;
}
