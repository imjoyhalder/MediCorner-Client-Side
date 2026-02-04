'use client';

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Package, ChevronLeft, ChevronRight, Hash, User, ShoppingBag } from "lucide-react";
import { format } from "date-fns";
import { AdminOrder, OrderStatus } from "@/types/order";

const statusColors: Record<OrderStatus, string> = {
    PROCESSING: "bg-amber-50 text-amber-700 border-amber-100",
    SHIPPED: "bg-blue-50 text-blue-700 border-blue-100",
    DELIVERED: "bg-emerald-50 text-emerald-700 border-emerald-100",
    CANCELLED: "bg-rose-50 text-rose-700 border-rose-100",
};

export default function AdminOrdersTable({ initialOrders }: { initialOrders: AdminOrder[] }) {
    const [filter, setFilter] = useState<OrderStatus | "ALL">("ALL");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 30;

    const filteredOrders = filter === "ALL"
        ? initialOrders
        : initialOrders.filter(order => order.overallStatus === filter);

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="space-y-6">
            {/* --- TOP BAR / FILTER --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-3xl border border-slate-200/60 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center bg-emerald-50 rounded-2xl border border-emerald-100">
                        <Package className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Orders List</h2>
                        <p className="text-xs text-slate-500 font-medium">
                            Total {filteredOrders.length} orders found
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider hidden sm:block">Filter By:</span>
                    <Select onValueChange={(val) => { setFilter(val as OrderStatus | "ALL"); setCurrentPage(1); }} defaultValue="ALL">
                        <SelectTrigger className="w-full sm:w-[180px] h-11 rounded-2xl border-slate-200 bg-slate-50/50 shadow-none font-semibold text-xs transition-all focus:ring-emerald-500">
                            <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-slate-200">
                            <SelectItem value="ALL" className="text-xs font-medium">All Orders</SelectItem>
                            <SelectItem value="PROCESSING" className="text-xs font-medium text-amber-600">Processing</SelectItem>
                            <SelectItem value="SHIPPED" className="text-xs font-medium text-blue-600">Shipped</SelectItem>
                            <SelectItem value="DELIVERED" className="text-xs font-medium text-emerald-600">Delivered</SelectItem>
                            <SelectItem value="CANCELLED" className="text-xs font-medium text-rose-600">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* --- TABLE CONTAINER --- */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm overflow-hidden transition-all">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-slate-50/80">
                            <TableRow className="hover:bg-transparent border-b border-slate-100">
                                <TableHead className="py-5 px-6 font-bold text-slate-500 text-[11px] uppercase tracking-widest">Order Details</TableHead>
                                <TableHead className="py-5 px-6 font-bold text-slate-500 text-[11px] uppercase tracking-widest">Customer</TableHead>
                                <TableHead className="py-5 px-6 font-bold text-slate-500 text-[11px] uppercase tracking-widest">Items & Seller</TableHead>
                                <TableHead className="py-5 px-6 font-bold text-slate-500 text-[11px] uppercase tracking-widest text-right">Amount</TableHead>
                                <TableHead className="py-5 px-6 font-bold text-slate-500 text-[11px] uppercase tracking-widest text-center">Current Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentOrders.length > 0 ? (
                                currentOrders.map((order, index) => (
                                    <TableRow key={`${order.orderId}-${index}`} className="group hover:bg-slate-50/30 border-b border-slate-100/50 last:border-0 transition-all duration-200">
                                        <TableCell className="py-5 px-6">
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-1">
                                                    <Hash className="size-3 text-slate-300" />
                                                    <span className="text-sm font-bold text-slate-900 tracking-tight">
                                                        {order.orderId.slice(-8).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-slate-400">
                                                    <Calendar size={12} />
                                                    <span className="text-[10px] font-semibold uppercase tracking-wide">
                                                        {format(new Date(order.orderDate), "dd MMM yyyy")}
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="py-5 px-6 text-sm font-semibold text-slate-700">
                                            <div className="flex items-center gap-2">
                                                <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-[10px]">
                                                    {order.customerName.charAt(0)}
                                                </div>
                                                {order.customerName}
                                            </div>
                                        </TableCell>

                                        <TableCell className="py-5 px-6">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                                                    <ShoppingBag size={14} className="text-slate-400" />
                                                    {order.productName}
                                                </span>
                                                <span className="text-[10px] font-bold text-emerald-600/80 bg-emerald-50 w-fit px-1.5 rounded-md mt-1 border border-emerald-100/50 uppercase tracking-tighter">
                                                    Seller: {order.sellerName}
                                                </span>
                                            </div>
                                        </TableCell>

                                        <TableCell className="py-5 px-6 text-right font-black text-slate-900 text-base">
                                            <span className="text-xs font-normal text-slate-400 mr-0.5">৳</span>
                                            {order.subTotal.toLocaleString()}
                                        </TableCell>

                                        <TableCell className="py-5 px-6 text-center">
                                            <Badge className={`text-[10px] font-bold rounded-xl border py-1 shadow-none uppercase px-3 tracking-wide ${statusColors[order.overallStatus]}`}>
                                                {order.overallStatus}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center gap-2 opacity-30">
                                            <Package size={40} />
                                            <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">No orders found</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* --- PAGINATION --- */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-slate-200/60 shadow-sm mt-6">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        Page <span className="text-slate-800">{currentPage}</span> of {totalPages}
                    </p>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="rounded-xl border border-slate-200 h-10 px-4 hover:bg-emerald-50 hover:text-emerald-700 transition-all font-bold text-xs disabled:opacity-30"
                        >
                            <ChevronLeft size={16} className="mr-1" /> Previous
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="rounded-xl border border-slate-200 h-10 px-4 hover:bg-emerald-50 hover:text-emerald-700 transition-all font-bold text-xs disabled:opacity-30"
                        >
                            Next <ChevronRight size={16} className="ml-1" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}