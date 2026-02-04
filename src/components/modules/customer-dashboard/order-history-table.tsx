"use client";

import { CustomerOrder } from "@/types/customer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { toast } from "sonner";
import { Package, XCircle, ChevronRight, MapPin } from "lucide-react";
import { cancelOrderAction } from "@/services/cutomer.service";

export default function OrderHistoryTable({ orders }: { orders: CustomerOrder[] }) {

    const handleCancel = async (orderId: string): Promise<void> => {
        // Professional Browser Confirmation
        const confirmCancel = window.confirm("Are you sure you want to cancel this order? This action cannot be undone.");

        if (!confirmCancel) return;

        // Loading toast start
        const toastId = toast.loading("Cancelling order...");

        try {
            const res = await cancelOrderAction(orderId);
            if (res.success) {
                toast.success("Order cancelled successfully", { id: toastId });
                // Data refresh korar jonno reload ba router.refresh()
                window.location.reload();
            } else {
                toast.error(res.message || "Failed to cancel", { id: toastId });
            }
        } catch (error) {
            toast.error("Something went wrong", { id: toastId });
        }
    };

    return (
        <div className="space-y-4">
            {orders.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-100">
                    <Package size={48} className="mx-auto text-slate-200 mb-4" />
                    <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No orders found</p>
                </div>
            ) : (
                orders.map((order) => (
                    <div key={order.orderId} className="group bg-white rounded-[2rem] border border-slate-100 p-5 md:p-6 shadow-sm hover:shadow-md transition-all">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#15a215]/10 group-hover:text-[#15a215] transition-colors">
                                    <Package size={24} />
                                </div>
                                <div>
                                    <h3 className="font-black text-black md:text-base uppercase ">
                                        Order #{order.orderId.slice(-8).toUpperCase()}
                                    </h3>
                                    <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        Placed on {format(new Date(order.createdAt), "PPP")}
                                    </p>
                                </div>
                            </div>
                            <Badge className={`rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-tighter ${order.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                order.status === 'CANCELLED' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                    'bg-amber-50 text-amber-600 border-amber-100'
                                }`}>
                                {order.status}
                            </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4 border-y border-slate-50">
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Purchased Items</p>
                                <div className="space-y-1">
                                    {order.medicines.map((item, idx) => (
                                        <p key={idx} className="text-xs font-bold text-slate-700 flex items-center gap-2">
                                            <ChevronRight size={12} className="text-[#15a215]" /> {item.name} <span className="text-slate-400">× {item.quantity}</span>
                                        </p>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Amount</p>
                                <p className="text-lg font-black text-slate-900 tracking-tighter">৳{order.total.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-end mt-4 gap-3">
                            {order.status === "PROCESSING" && (
                                <Button
                                    onClick={() => handleCancel(order.orderId)}
                                    variant="ghost"
                                    className="text-rose-500 hover:bg-rose-50 font-bold text-xs rounded-xl h-10 px-6 border border-transparent hover:border-rose-100"
                                >
                                    <XCircle size={16} className="mr-2" /> Cancel Order
                                </Button>
                            )}
                            <Button className="bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl h-10 px-6 shadow-lg shadow-slate-100">
                                Order Details
                            </Button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}