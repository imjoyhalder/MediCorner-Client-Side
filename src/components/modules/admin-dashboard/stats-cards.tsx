import { Card, CardContent } from "@/components/ui/card";
import { AdminStatisticsData } from "@/types/admin";

export function AdminStatsCards({
    stats,
}: {
    stats: AdminStatisticsData;
}) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="rounded-2xl">
                <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <h2 className="text-2xl font-bold">
                        {stats.usersVsSellers.users}
                    </h2>
                </CardContent>
            </Card>

            <Card className="rounded-2xl">
                <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground">
                        Total Sellers
                    </p>
                    <h2 className="text-2xl font-bold">
                        {stats.usersVsSellers.sellers}
                    </h2>
                </CardContent>
            </Card>
            <Card className="rounded-2xl">
                <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground">
                        Total Revenue
                    </p>
                    <h2 className="text-2xl font-bold">
                        {stats.totalRevenue}
                    </h2>
                </CardContent>
            </Card>
        </div>
    );
}
