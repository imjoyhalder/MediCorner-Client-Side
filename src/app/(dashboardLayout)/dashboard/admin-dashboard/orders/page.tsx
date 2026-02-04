import AdminOrdersTable from "@/components/modules/admin-dashboard/orderTable";
import { getAllOrderForAdmin } from "@/services/order.service";


export default async function AdminOrdersPage() {
    const response = await getAllOrderForAdmin();
    const orders = response?.success ? response.data : [];

    return (
        <div className="space-y-6 p-4 md:p-6">
            <div>
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">Orders Management</h1>
                <p className="text-slate-500 text-sm font-medium">
                    Monitor and manage all customer orders across the platform.
                </p>
            </div>

            <AdminOrdersTable initialOrders={orders} />
        </div>
    );
}