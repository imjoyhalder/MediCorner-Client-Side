"use client"

import { SellerOrder, OrderStatus } from "@/types/order"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IconPackage, IconUser, IconCalendar, IconCurrencyTaka } from "@tabler/icons-react"
import { updateOrderBatchStatus } from "@/services/seller.service"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { OrderSummarySheet } from "./order-list"


export function OrderCard({ order }: { order: SellerOrder }) {
    const router = useRouter();

    const handleStatusChange = async (newStatus: OrderStatus) => {
        const res = await updateOrderBatchStatus(order.id, newStatus);
        if (res.success) {
            toast.success(`Order items updated to ${newStatus}`);
            router.refresh();
        } else {
            toast.error(res.message);
        }
    }

    return (
        <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4 sm:p-6 border-b bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                        <IconPackage size={24} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-lg">Order #{order.id.slice(-8).toUpperCase()}</span>
                            <Badge variant={order.batchStatus === "DELIVERED" ? "default" : "secondary"}>
                                {order.batchStatus}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1"><IconCalendar size={14} /> {new Date(order.createdAt).toLocaleDateString()}</span>
                            <span className="flex items-center gap-1"><IconUser size={14} /> {order.user.name}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="text-right mr-2 hidden sm:block">
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Your Earnings</p>
                        <p className="text-xl font-black text-emerald-600 flex items-center justify-end">
                            <IconCurrencyTaka size={20} />{order.sellerSubtotal}
                        </p>
                    </div>
                    <Select defaultValue={order.batchStatus} onValueChange={(v) => handleStatusChange(v as OrderStatus)}>
                        <SelectTrigger className="w-[140px] bg-white">
                            <SelectValue placeholder="Update Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="PROCESSING">Processing</SelectItem>
                            <SelectItem value="SHIPPED">Shipped</SelectItem>
                            <SelectItem value="DELIVERED">Delivered</SelectItem>
                            <SelectItem value="CANCELLED">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="p-4 bg-slate-50 border-t flex flex-col sm:flex-row justify-between gap-3 text-sm">
                <p className="text-muted-foreground">
                    <strong>Shipping:</strong> {order.shippingAddress}
                </p>
                <OrderSummarySheet order={order} />
            </div>
        </div>
    )
}