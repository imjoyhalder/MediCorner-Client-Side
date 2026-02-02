import {
    Users,
    Store,
    DollarSign,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { AdminStatisticsData } from "@/types/admin";

export function AdminStatsCards({
    stats,
}: {
    stats: AdminStatisticsData;
}) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* USERS */}
            <Card className="rounded-2xl border bg-background shadow-sm">
                <CardContent className="flex items-center justify-between p-6">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Total Users
                        </p>
                        <h2 className="mt-1 text-2xl font-semibold">
                            {stats.usersVsSellers.users}
                        </h2>
                    </div>

                    <div className="flex size-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                        <Users className="size-6" />
                    </div>
                </CardContent>
            </Card>

            {/* SELLERS */}
            <Card className="rounded-2xl border bg-background shadow-sm">
                <CardContent className="flex items-center justify-between p-6">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Total Sellers
                        </p>
                        <h2 className="mt-1 text-2xl font-semibold">
                            {stats.usersVsSellers.sellers}
                        </h2>
                    </div>

                    <div className="flex size-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                        <Store className="size-6" />
                    </div>
                </CardContent>
            </Card>

            {/* pending orders */}
            <Card className="rounded-2xl border bg-background shadow-sm">
                <CardContent className="flex items-center justify-between p-6">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Pending Orders
                        </p>
                        <h2 className="mt-1 text-2xl font-semibold">
                            ৳ {stats.pendingOrders.toLocaleString()}
                        </h2>
                    </div>

                    <div className="flex size-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                        <DollarSign className="size-6" />
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-2xl border bg-background shadow-sm">
                <CardContent className="flex items-center justify-between p-6">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Total Revenue
                        </p>
                        <h2 className="mt-1 text-2xl font-semibold">
                            ৳ {stats.totalRevenue.toLocaleString()}
                        </h2>
                    </div>

                    <div className="flex size-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                        <DollarSign className="size-6" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
