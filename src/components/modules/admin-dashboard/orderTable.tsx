
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
import { Calendar, Package, User, Store, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { AdminOrder, OrderStatus } from "@/types/order";

const statusColors: Record<OrderStatus, string> = {
    PROCESSING: "bg-blue-50 text-blue-700 border-blue-200",
    SHIPPED: "bg-purple-50 text-purple-700 border-purple-200",
    DELIVERED: "bg-green-50 text-green-700 border-green-200",
    CANCELLED: "bg-red-50 text-red-700 border-red-200",
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
        <div className="space-y-4">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-green-50 rounded-lg">
                        <Package className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-slate-800">Order Management</h2>
                        <p className="text-[11px] text-slate-500 font-medium tracking-tight">
                            Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length}
                        </p>
                    </div>
                </div>

                <Select onValueChange={(val) => { setFilter(val as OrderStatus | "ALL"); setCurrentPage(1); }} defaultValue="ALL">
                    <SelectTrigger className="w-full sm:w-[160px] h-10 rounded-xl border-slate-200 shadow-none font-bold text-xs uppercase">
                        <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Orders</SelectItem>
                        <SelectItem value="PROCESSING">Processing</SelectItem>
                        <SelectItem value="SHIPPED">Shipped</SelectItem>
                        <SelectItem value="DELIVERED">Delivered</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Table Container */}
            <div className="rounded-[2rem] border border-slate-100 bg-white shadow-sm overflow-hidden min-h-[400px]">
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        <TableRow className="hover:bg-transparent border-b border-slate-100">
                            <TableHead className="py-4 px-5 font-bold text-slate-700 text-[10px] uppercase">Order Info</TableHead>
                            <TableHead className="py-4 px-5 font-bold text-slate-700 text-[10px] uppercase">Customer</TableHead>
                            <TableHead className="py-4 px-5 font-bold text-slate-700 text-[10px] uppercase">Medicine</TableHead>
                            <TableHead className="py-4 px-5 font-bold text-slate-700 text-[10px] uppercase text-right">Subtotal</TableHead>
                            <TableHead className="py-4 px-5 font-bold text-slate-700 text-[10px] uppercase text-center">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentOrders.length > 0 ? (
                            currentOrders.map((order, index) => (
                                <TableRow key={`${order.orderId}-${index}`} className="group hover:bg-slate-50/50 border-b border-slate-50 last:border-0 transition-colors">
                                    <TableCell className="py-4 px-5">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-black text-slate-800 tracking-tighter italic">#{order.orderId.slice(-6).toUpperCase()}</span>
                                            <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1 uppercase tracking-wider">
                                                <Calendar size={10} /> {format(new Date(order.orderDate), "MMM dd, yyyy")}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 px-5 font-bold text-sm text-slate-700">{order.customerName}</TableCell>
                                    <TableCell className="py-4 px-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-800">{order.productName}</span>
                                            <span className="text-[10px] font-bold text-green-600 uppercase italic tracking-tighter">S: {order.sellerName}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 px-5 text-right font-black text-slate-900 tracking-tight">৳{order.subTotal}</TableCell>
                                    <TableCell className="py-4 px-5 text-center">
                                        <Badge className={`text-[9px] font-black rounded-lg border-2 shadow-none uppercase px-2 py-0.5 ${statusColors[order.overallStatus]}`}>
                                            {order.overallStatus}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-40 text-center font-bold text-slate-300">No data found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mt-4">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        Page {currentPage} of {totalPages}
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="rounded-xl border-slate-200 h-9 w-9 p-0 hover:bg-green-50 hover:text-green-600 disabled:opacity-30"
                        >
                            <ChevronLeft size={16} />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="rounded-xl border-slate-200 h-9 w-9 p-0 hover:bg-green-50 hover:text-green-600 disabled:opacity-30"
                        >
                            <ChevronRight size={16} />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}