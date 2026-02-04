"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IconUser, IconMapPin, IconPhone, IconMail, IconPackage, IconChevronRight, IconLoader2, IconExternalLink } from "@tabler/icons-react"
import { SellerOrder, OrderStatus } from "@/types/order"
import { updateOrderBatchStatus } from "@/services/seller.service"

export function OrderSummarySheet({ order }: { order: SellerOrder }) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleStatusUpdate = async (newStatus: OrderStatus) => {
        startTransition(async () => {
            try {
                const res = await updateOrderBatchStatus(order.id, newStatus)
                if (res.success) {
                    toast.success(`Status updated to ${newStatus}`)
                    router.refresh()
                } else {
                    toast.error(res.message)
                }
            } catch (err) {
                toast.error("Failed to update status")
            }
        })
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-blue-600 font-bold hover:bg-blue-50 gap-1">
                    View Full Summary <IconChevronRight size={14} />
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-[550px] overflow-y-auto p-0 border-l">
                <div className="flex flex-col h-full bg-slate-50/30">
                    <div className="p-6 bg-white border-b sticky top-0 z-20">
                        <SheetHeader>
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <SheetTitle>Order Summary</SheetTitle>
                                    <SheetDescription>#{order.id.slice(-8).toUpperCase()}</SheetDescription>
                                </div>
                                <Badge>{order.batchStatus}</Badge>
                            </div>
                        </SheetHeader>
                    </div>

                    <div className="p-6 space-y-6 flex-1">
                        {/* Customer & Product details same as previous design */}
                        <div className="bg-white p-5 rounded-2xl border space-y-4">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <IconUser size={14} /> Customer
                            </h4>
                            <p className="font-bold">{order.user.name}</p>
                            <p className="text-sm text-slate-500">{order.user.email}</p>
                            <p className="text-sm text-slate-600 flex items-center gap-2 border-t pt-2">
                                <IconMapPin size={16} className="text-red-400" /> {order.shippingAddress}
                            </p>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-2">
                            {order.items.map(item => (
                                <div key={item.id} className="bg-white p-4 rounded-xl border flex justify-between">
                                    <div>
                                        <p className="font-bold">{item.sellerMedicine.medicine.name}</p>
                                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-bold text-blue-600">৳{item.price * item.quantity}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 bg-white border-t">
                        <Select disabled={isPending} onValueChange={(val) => handleStatusUpdate(val as OrderStatus)}>
                            <SelectTrigger className="h-11">
                                <SelectValue placeholder="Quick Status Update" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PROCESSING">Processing</SelectItem>
                                <SelectItem value="SHIPPED">Shipped</SelectItem>
                                <SelectItem value="DELIVERED">Delivered</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}