
"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, BarChart, Bar, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { getStatisticsForAdminDashboard } from "@/services/admin.service";
import { AdminStatsCards } from "./stats-cards";
import { AdminStatisticsData } from "@/types/admin-dashboard";

const chartConfig = {
    revenue: { label: "Revenue", color: "#15a215" },
    orders: { label: "Orders", color: "#6366f1" },
    quantity: { label: "Sold", color: "#ec4899" },
} satisfies ChartConfig;

interface ChartDataItem {
    name: string;
    value: number;
    color?: string;
}

export function AdminDashboardCharts() {
    const [stats, setStats] = React.useState<AdminStatisticsData | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await getStatisticsForAdminDashboard();
                if (res.data) setStats(res.data);
            } catch (error) {
                console.error("Failed to fetch admin stats:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (isLoading) return <DashboardSkeleton />;
    if (!stats) return null;

    const usersVsSellersData: ChartDataItem[] = [
        { name: "Users", value: stats.usersVsSellers.users, color: "#3b82f6" },
        { name: "Sellers", value: stats.usersVsSellers.sellers, color: "#f59e0b" },
    ];

    return (
        <div className="space-y-8 p-4 md:p-6 min-h-screen max-w-5xl mx-auto">
            {/* Top Stats Cards */}
            <AdminStatsCards stats={stats} />
            <div className="flex flex-col gap-8">

                {/* REVENUE ANALYSIS */}
                <Card className="rounded-xl border shadow-sm bg-white overflow-hidden">
                    <CardHeader className="pt-6 px-6">
                        <CardTitle className="text-xl font-bold uppercase tracking-tight text-slate-800">
                            Revenue Analysis
                        </CardTitle>
                        <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Earnings Over Time
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-2 pb-6">
                        <ChartContainer config={chartConfig} className="h-[350px] w-full">
                            <AreaChart data={stats.revenueOverTime}>
                                <defs>
                                    <linearGradient id="adminRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#15a215" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#15a215" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fontSize: 10, fontWeight: 700 }}
                                    tickFormatter={(str: string) => new Date(str).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                />
                                <YAxis hide />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#15a215"
                                    strokeWidth={3}
                                    fill="url(#adminRev)"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* ORDER TRENDS */}
                <Card className="rounded-xl border shadow-sm bg-white overflow-hidden">
                    <CardHeader className="pt-6 px-6">
                        <CardTitle className="text-xl font-bold uppercase tracking-tight text-slate-800">
                            Order Trends
                        </CardTitle>
                        <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Daily Activity
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-2 pb-6">
                        <ChartContainer config={chartConfig} className="h-[350px] w-full">
                            <AreaChart data={stats.ordersOverTime}>
                                <defs>
                                    <linearGradient id="adminOrders" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fontSize: 10, fontWeight: 700 }}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area
                                    type="stepAfter"
                                    dataKey="count"
                                    stroke="#6366f1"
                                    strokeWidth={3}
                                    fill="url(#adminOrders)"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* INVENTORY INSIGHTS */}
                <InventoryInsights data={stats.topMedicines} />

                {/* USER SEGMENTS */}
                <UserSegmentBar data={usersVsSellersData} />
            </div>
        </div>
    );
}

function InventoryInsights({ data }: { data: { name: string; value: number }[] }) {
    return (
        <Card className="rounded-xl border shadow-sm bg-white p-6">
            <h3 className="text-lg font-bold uppercase tracking-tight mb-6 px-2">Top Selling Medicines</h3>
            <ChartContainer config={{}} className="h-[350px] w-full">
                <BarChart data={data} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={120} tick={{ fontSize: 11, fontWeight: 600 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="#ec4899" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
            </ChartContainer>
        </Card>
    );
}

function UserSegmentBar({ data }: { data: ChartDataItem[] }) {
    return (
        <Card className="rounded-xl border shadow-sm bg-white p-6">
            <h3 className="text-lg font-bold uppercase tracking-tight mb-6 px-2">User Segments</h3>
            <ChartContainer config={{}} className="h-[350px] w-full">
                <BarChart data={data}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700 }} />
                    <YAxis hide />
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={80}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ChartContainer>
        </Card>
    );
}

function DashboardSkeleton() {
    return (
        <div className="space-y-8 p-6 max-w-5xl mx-auto">
            <div className="grid gap-4 md:grid-cols-4">
                {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-32 rounded-xl" />)}
            </div>
            <div className="flex flex-col gap-8">
                <Skeleton className="h-[400px] rounded-xl" />
                <Skeleton className="h-[400px] rounded-xl" />
            </div>
        </div>
    );
}