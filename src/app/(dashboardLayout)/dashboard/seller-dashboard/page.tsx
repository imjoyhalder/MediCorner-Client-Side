
import { ChartAreaInteractive } from "@/components/modules/seller-dashboard/chart-area-interactive"
import { SectionCards } from "@/components/modules/seller-dashboard/section-cards"
import { getSellerStatistics, getSellerStatsSummary } from "@/services/seller.service"

export default async function DashboardPage() {
  const [statsRes, chartRes] = await Promise.all([
    getSellerStatsSummary(),
    getSellerStatistics(),
  ]);

  return (
    <>
      {/* Stats Cards */}
      <SectionCards stats={statsRes.data} />

      {/* Analytics Chart */}
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive statsData={chartRes.data} />
      </div>
    </>
  );
}