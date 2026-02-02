import { AdminDashboardCharts } from "@/components/modules/admin-dashboard/admin-dashboard-charts";

import { AdminStatsCards } from "@/components/modules/admin-dashboard/stats-cards";

export default async function AdminDashboardPage() {
    return (
        <div>
            {/* <AdminStatsCards/> */}
            <AdminDashboardCharts/>
        </div>
    );
}
