import OrderHistoryTable from "@/components/modules/customer-dashboard/order-history-table";
import { getMyOrders } from "@/services/cutomer.service";
import { ShoppingBag } from "lucide-react";

export default async function OrdersPage() {
    const response = await getMyOrders();
    const orders = response?.data || [];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
                <div className="p-2 bg-emerald-100 rounded-xl text-[#15a215]">
                    <ShoppingBag size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-black text-slate-900  tracking-tight uppercase">My Orders</h1>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Manage your purchases and tracking</p>
                </div>
            </div>

            {/* Professional List View */}
            <OrderHistoryTable orders={orders} />
        </div>
    );
}