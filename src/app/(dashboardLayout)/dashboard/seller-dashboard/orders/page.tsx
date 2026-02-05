import { getSellerOrders } from "@/services/seller.service";
import { SellerOrderList } from "@/components/modules/seller-dashboard/seller-order-list";

export default async function OrdersPage() {
    const response = await getSellerOrders();
    const orders = response?.data || [];

    return (
        <main className="min-h-screen bg-slate-50/50">
            <SellerOrderList orders={orders} />
        </main>
    );
}