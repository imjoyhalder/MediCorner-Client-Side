import { Navbar } from "@/components/layouts/navbar1";
import OrderHistoryTable from "@/components/modules/customer-dashboard/order-history-table";
import { getMyOrders } from "@/services/cutomer.service";
import { Package, Clock, CheckCircle2, XCircle, TrendingUp } from "lucide-react";
import { CustomerOrder } from "@/types/customer";
import { Button } from "@/components/ui/button";

export default async function CustomerDashboard() {
    const response = await getMyOrders();
    const orders: CustomerOrder[] = response?.data || [];

    const stats = [
        { label: "Total Orders", value: orders.length, icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Pending", value: orders.filter((o) => o.status === "PROCESSING").length, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Completed", value: orders.filter((o) => o.status === "DELIVERED").length, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Cancelled", value: orders.filter((o) => o.status === "CANCELLED").length, icon: XCircle, color: "text-rose-600", bg: "bg-rose-50" },
    ];

    return (
        <div className="min-h-screen bg-[#fcfdfe]">
            <div className="p-4 md:p-10 space-y-10 max-w-7xl mx-auto">
                {/* Welcome Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-slate-900 ">Dashboard</h1>
                        <p className="text-slate-500 font-medium text-sm">Hello, welcome back to your health panel.</p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100">
                        <TrendingUp size={16} className="text-[#15a215]" />
                        <span className="text-xs font-bold text-emerald-700 uppercase">System Active</span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
                            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                <p className="text-2xl font-black text-slate-900 mt-1">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Orders Section */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                        <div>
                            <h2 className="font-black text-slate-800 text-lg  uppercase">Recent Orders</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your latest medicine purchases</p>
                        </div>
                        <Button variant="ghost" className="text-xs font-bold text-[#15a215] hover:bg-emerald-50">View All History</Button>
                    </div>
                    <div className="p-2">
                        <OrderHistoryTable orders={orders} />
                    </div>
                </div>
            </div>
        </div>
    );
}