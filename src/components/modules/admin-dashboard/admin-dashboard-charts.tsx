
"use client";

import { useEffect, useState } from "react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
    BarChart,
    Bar,
    ResponsiveContainer,
    Cell,
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";

import { Skeleton } from "@/components/ui/skeleton";
import { getStatisticsForAdminDashboard } from "@/services/admin.service";
import { AdminStatisticsData } from "@/types/admin";
import { AdminStatsCards } from "./stats-cards";


const chartConfig = {
    orders: { label: "Orders", color: "#6366f1" },   
    revenue: { label: "Revenue", color: "#10b981" }, 
    users: { label: "Users", color: "#3b82f6" },     
    sellers: { label: "Sellers", color: "#f59e0b" }, 
    quantity: { label: "Sold", color: "#ec4899" },   
} satisfies ChartConfig;

export function AdminDashboardCharts() {
    const [stats, setStats] = useState<AdminStatisticsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await getStatisticsForAdminDashboard();
                if (res.data) setStats(res.data);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    if (isLoading) return <DashboardSkeleton />;
    if (!stats) return null;

  
    const ordersData = Object.entries(stats.ordersOverTime).map(([date, orders]) => ({ date, orders }));
    const revenueData = Object.entries(stats.revenueOverTime).map(([date, revenue]) => ({ date, revenue }));

    const usersVsSellersData = [
        { name: "Users", value: stats.usersVsSellers.users, color: chartConfig.users.color },
        { name: "Sellers", value: stats.usersVsSellers.sellers, color: chartConfig.sellers.color },
    ];

    const topMedicinesData = Object.entries(stats.topMedicines)
        .map(([name, quantity]) => ({ name, quantity }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 6);

    return (
        <div className="space-y-8 p-4 md:p-6 bg-slate-50/50 dark:bg-transparent min-h-screen">
            <AdminStatsCards stats={stats} />

            <div className="grid gap-6 lg:grid-cols-2">


                <Card className="border-none shadow-lg bg-white/80 dark:bg-slate-900/50 backdrop-blur-md">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                            Revenue Analysis
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[300px] w-full">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={chartConfig.revenue.color} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={chartConfig.revenue.color} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke={chartConfig.revenue.color}
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorRev)"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg bg-white/80 dark:bg-slate-900/50 backdrop-blur-md">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                            Order Trends
                        </CardTitle>
                        <CardDescription>Daily Orders</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[300px] w-full">
                            <AreaChart data={ordersData}>
                                <defs>
                                    <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "#64748b" }}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area
                                    type="stepAfter"
                                    dataKey="orders"

                                    stroke="#6366f1"
                                    strokeWidth={3}
                                    fill="url(#colorOrders)"

                                    activeDot={{ r: 6, strokeWidth: 0, fill: "#4f46e5" }}
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg bg-white/80 dark:bg-slate-900/50 backdrop-blur-md">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">User Segments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[250px] w-full">
                            <BarChart data={usersVsSellersData} margin={{ top: 20 }}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={50}>
                                    {usersVsSellersData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>


                <Card className="border-none shadow-lg bg-white/80 dark:bg-slate-900/50 backdrop-blur-md">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">Inventory Insights</CardTitle>
                        <CardDescription>Top selling medicine</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[250px] w-full">
                            <BarChart data={topMedicinesData} layout="vertical">
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} tick={{ fontSize: 11 }} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="quantity" fill={chartConfig.quantity.color} radius={[0, 5, 5, 0]} barSize={20} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}


function DashboardSkeleton() {
    return (
        <div className="space-y-8 p-6">
            <div className="grid gap-4 md:grid-cols-4">
                {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-32 rounded-2xl" />)}
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                <Skeleton className="h-[400px] rounded-2xl" />
                <Skeleton className="h-[400px] rounded-2xl" />
            </div>
        </div>
    );
}