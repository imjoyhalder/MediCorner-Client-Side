"use client";

import { useEffect, useState } from "react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    XAxis,
    BarChart,
    Bar,
} from "recharts";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";

import { getStatisticsForAdminDashboard } from "@/services/admin.service";
import { AdminStatisticsData } from "@/types/admin";
import { AdminStatsCards } from "./stats-cards";

/* ------------------ CHART CONFIGS ------------------ */

const ordersChartConfig: ChartConfig = {
    orders: {
        label: "Orders",
        color: "var(--chart-1)",
    },
};

const revenueChartConfig: ChartConfig = {
    revenue: {
        label: "Revenue",
        color: "var(--chart-2)",
    },
};

const usersVsSellersChartConfig: ChartConfig = {
    value: {
        label: "Count",
        color: "var(--chart-3)",
    },
};

export function AdminDashboardCharts() {
    const [stats, setStats] = useState<AdminStatisticsData | null>(null);

    useEffect(() => {
        (async () => {
            const res = await getStatisticsForAdminDashboard();
            if (res.data) setStats(res.data);
        })();
    }, []);

    if (!stats) return null;

    /* ------------------ DATA TRANSFORM ------------------ */

    const ordersData = Object.entries(stats.ordersOverTime).map(
        ([date, orders]) => ({
            date,
            orders,
        })
    );

    const revenueData = Object.entries(stats.revenueOverTime).map(
        ([date, revenue]) => ({
            date,
            revenue,
        })
    );

    const usersVsSellersData = [
        { label: "Users", value: stats.usersVsSellers.users },
        { label: "Sellers", value: stats.usersVsSellers.sellers },
    ];

    /* ------------------ UI ------------------ */

    return (
        <div>
            <AdminStatsCards stats={stats} />
            <div className="grid gap-6 md:grid-cols-2 mt-2">
                {/* ORDERS */}
                <Card className="rounded-2xl">
                    <CardHeader>
                        <CardTitle>Orders Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={ordersChartConfig}
                            className="h-[260px] w-full"
                        >
                            <AreaChart data={ordersData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) =>
                                        new Date(value).toLocaleDateString(
                                            "en-US",
                                            { month: "short", day: "numeric" }
                                        )
                                    }
                                />
                                <ChartTooltip
                                    content={
                                        <ChartTooltipContent indicator="dot" />
                                    }
                                />
                                <Area
                                    dataKey="orders"
                                    type="monotone"
                                    fill="var(--color-orders)"
                                    stroke="var(--color-orders)"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* REVENUE */}
                <Card className="rounded-2xl">
                    <CardHeader>
                        <CardTitle>Revenue Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={revenueChartConfig}
                            className="h-[260px] w-full"
                        >
                            <AreaChart data={revenueData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) =>
                                        new Date(value).toLocaleDateString(
                                            "en-US",
                                            { month: "short", day: "numeric" }
                                        )
                                    }
                                />
                                <ChartTooltip
                                    content={
                                        <ChartTooltipContent indicator="dot" />
                                    }
                                />
                                <Area
                                    dataKey="revenue"
                                    type="monotone"
                                    fill="var(--color-revenue)"
                                    stroke="var(--color-revenue)"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* USERS VS SELLERS */}
                <Card className="rounded-2xl md:col-span-2">
                    <CardHeader>
                        <CardTitle>Users vs Sellers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={usersVsSellersChartConfig}
                            className="h-[240px] w-full"
                        >
                            <BarChart data={usersVsSellersData}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="label" />
                                <ChartTooltip
                                    content={
                                        <ChartTooltipContent indicator="dot" />
                                    }
                                />
                                <Bar
                                    dataKey="value"
                                    radius={[8, 8, 0, 0]}
                                    fill="var(--color-value)"
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
