"use client"

import { useState, useMemo } from "react"
import { SellerOrder } from "@/types/order"
import { OrderCard } from "./order-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IconSearch, IconFilter } from "@tabler/icons-react"

interface OrderListProps {
    orders: SellerOrder[]
}

export function SellerOrderList({ orders }: OrderListProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("ALL")

    // Filtering Logic
    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const matchesSearch =
                order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.user.name.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesStatus =
                statusFilter === "ALL" || order.batchStatus === statusFilter

            return matchesSearch && matchesStatus
        })
    }, [orders, searchTerm, statusFilter])

    return (
        <div className="space-y-6 px-4 lg:px-6 py-8 max-w-7xl mx-auto">
            {/* Header & Stats */}
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Orders</h1>
                <p className="text-slate-500">Manage and track your pharmacy orders.</p>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <Input
                        placeholder="Search by Order ID or Customer..."
                        className="pl-10 bg-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[200px] bg-white">
                        <div className="flex items-center gap-2">
                            <IconFilter size={16} />
                            <SelectValue placeholder="All Status" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Status</SelectItem>
                        <SelectItem value="PROCESSING">Processing</SelectItem>
                        <SelectItem value="SHIPPED">Shipped</SelectItem>
                        <SelectItem value="DELIVERED">Delivered</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))
                ) : (
                    <div className="text-center py-20 bg-white border-2 border-dashed rounded-xl">
                        <p className="text-slate-400">No orders found matching your filters.</p>
                    </div>
                )}
            </div>
        </div>
    )
}