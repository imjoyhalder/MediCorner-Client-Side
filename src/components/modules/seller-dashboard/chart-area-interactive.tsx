

// "use client";

// import * as React from "react";
// import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
// import { SellerStatistics } from "@/types/seller";
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
//   type ChartConfig,
// } from "@/components/ui/chart";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// const chartConfig = {
//   count: {
//     label: "Orders",
//     color: "hsl(var(--primary))",
//   },
// } satisfies ChartConfig;

// interface ChartProps {
//   statsData: SellerStatistics;
// }

// export function ChartAreaInteractive({ statsData }: ChartProps) {
//   const [timeRange, setTimeRange] = React.useState<string>("90d");

//   const formattedData = React.useMemo(() => {
//     return Object.entries(statsData.ordersOverTime)
//       .map(([date, count]) => ({
//         date,
//         count,
//       }))
//       .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
//   }, [statsData]);


//   const filteredData = React.useMemo(() => {
//     const now = new Date();
//     let daysToSubtract = 90;

//     if (timeRange === "30d") daysToSubtract = 30;
//     if (timeRange === "7d") daysToSubtract = 7;

//     const startDate = new Date();
//     startDate.setDate(now.getDate() - daysToSubtract);

//     return formattedData.filter((item) => new Date(item.date) >= startDate);
//   }, [formattedData, timeRange]);

//   return (
//     <Card className="@container/card">
//       <CardHeader className="flex flex-row items-center justify-between">
//         <div>
//           <CardTitle>Orders Analytics</CardTitle>
//           <CardDescription>
//             Showing orders for the last {timeRange === "90d" ? "3 months" : timeRange === "30d" ? "30 days" : "7 days"}
//           </CardDescription>
//         </div>
//         <CardAction>
//           {/* Desktop Filter */}
//           <ToggleGroup
//             type="single"
//             value={timeRange}
//             onValueChange={(val) => val && setTimeRange(val)}
//             variant="outline"
//             className="hidden @[600px]/card:flex"
//           >
//             <ToggleGroupItem value="90d">90D</ToggleGroupItem>
//             <ToggleGroupItem value="30d">30D</ToggleGroupItem>
//             <ToggleGroupItem value="7d">7D</ToggleGroupItem>
//           </ToggleGroup>

//           {/* Mobile Filter */}
//           <Select value={timeRange} onValueChange={setTimeRange}>
//             <SelectTrigger className="w-[120px] @[600px]/card:hidden">
//               <SelectValue placeholder="Range" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="90d">Last 3 Months</SelectItem>
//               <SelectItem value="30d">Last 30 Days</SelectItem>
//               <SelectItem value="7d">Last 7 Days</SelectItem>
//             </SelectContent>
//           </Select>
//         </CardAction>
//       </CardHeader>
//       <CardContent className="px-2 pt-4 sm:px-6">
//         <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
//           <AreaChart data={filteredData}>
//             <defs>
//               <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="var(--color-count)" stopOpacity={0.3} />
//                 <stop offset="95%" stopColor="var(--color-count)" stopOpacity={0.1} />
//               </linearGradient>
//             </defs>
//             <CartesianGrid vertical={false} strokeDasharray="3 3" />
//             <XAxis
//               dataKey="date"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={10}
//               tickFormatter={(value) => {
//                 const date = new Date(value);
//                 return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
//               }}
//             />
//             <ChartTooltip
//               content={
//                 <ChartTooltipContent
//                   labelFormatter={(value) => new Date(value).toDateString()}
//                 />
//               }
//             />
//             <Area
//               dataKey="count"
//               type="monotone"
//               fill="url(#fillCount)"
//               stroke="var(--color-count)"
//               strokeWidth={2}
//             />
//           </AreaChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { SellerStatistics } from "@/types/seller";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  count: {
    label: "Orders",
    color: "#15a215", // Direct color use kora safe
  },
} satisfies ChartConfig;

interface ChartProps {
  statsData: SellerStatistics;
}

export function ChartAreaInteractive({ statsData }: ChartProps) {
  const [timeRange, setTimeRange] = React.useState<string>("90d");

  const formattedData = React.useMemo(() => {
    if (!statsData?.ordersOverTime || !Array.isArray(statsData.ordersOverTime)) {
      return [];
    }
    return statsData.ordersOverTime.map((item) => ({
      date: item.date,
      count: item.count,
    }));
  }, [statsData]);

  const filteredData = React.useMemo(() => {
    if (formattedData.length === 0) return [];

    const now = new Date();
    let daysToSubtract = 90;

    if (timeRange === "30d") daysToSubtract = 30;
    if (timeRange === "7d") daysToSubtract = 7;

    const startDate = new Date();
    startDate.setDate(now.getDate() - daysToSubtract);

    return formattedData.filter((item) => new Date(item.date) >= startDate);
  }, [formattedData, timeRange]);

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="flex flex-col items-start gap-4 space-y-0 border-b border-slate-50 py-8 sm:flex-row sm:items-center">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle className="text-xl font-black  uppercase ">Orders Analytics</CardTitle>
          <CardDescription className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Last {timeRange === "90d" ? "3 months" : timeRange === "30d" ? "30 days" : "7 days"}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] rounded-xl bg-slate-50 border-none font-bold text-xs uppercase tracking-wider h-10">
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-slate-100">
            <SelectItem value="90d" className="text-xs font-bold uppercase tracking-wider">Last 3 Months</SelectItem>
            <SelectItem value="30d" className="text-xs font-bold uppercase tracking-wider">Last 30 Days</SelectItem>
            <SelectItem value="7d" className="text-xs font-bold uppercase tracking-wider">Last 7 Days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-10 sm:px-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[350px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#15a215" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#15a215" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={15}
              minTickGap={30}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
              }}
              className="text-[10px] font-bold uppercase tracking-tighter text-slate-400"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              className="text-[10px] font-bold text-slate-400"
            />
            <ChartTooltip
              cursor={{ stroke: '#15a215', strokeWidth: 1, strokeDasharray: '4 4' }}
              content={
                <ChartTooltipContent
                  className="rounded-2xl border-none shadow-2xl bg-white"
                  labelFormatter={(value) => new Date(value).toDateString()}
                />
              }
            />
            <Area
              dataKey="count"
              type="monotone"
              fill="url(#fillCount)"
              stroke="#15a215"
              strokeWidth={3}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#15a215' }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}