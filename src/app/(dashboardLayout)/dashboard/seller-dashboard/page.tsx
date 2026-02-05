
import { ChartAreaInteractive } from "@/components/modules/seller-dashboard/chart-area-interactive"
import { SectionCards } from "@/components/modules/seller-dashboard/section-cards"
import { getSellerStatistics, getSellerStatsSummary } from "@/services/seller.service"

export default async function DashboardPage() {

  const [statsRes, chartRes] = await Promise.all([
    getSellerStatsSummary(),
    getSellerStatistics(),
  ]);

  const statsData = statsRes?.success ? statsRes.data : null;

  const chartData = chartRes?.success ? chartRes.data : {
    ordersOverTime: [],
    revenuePerMedicine: [],
    stockPerMedicine: []
  };

  return (
    <div className="space-y-8 pb-10">
      {/* 1. Header Section with Stats */}
      {statsData ? (
        <SectionCards stats={statsData} />
      ) : (
        <div className="p-4 text-slate-400 text-sm">Failed to load statistics summary.</div>
      )}


      <div className="px-4 lg:px-6">
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <ChartAreaInteractive statsData={chartData} />
        </div>
      </div>
    </div>
  );
}