"use client";

import { IconTrendingUp, IconMedicineSyrup, IconShoppingCart, IconStar } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SellerStatsSummary } from "@/types/seller";

interface SectionCardsProps {
  stats: SellerStatsSummary;
}

export function SectionCards({ stats }: SectionCardsProps) {
  // যদি ডাটা না থাকে
  if (!stats) return null;

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card grid grid-cols-1 gap-4 px-4 lg:px-6 lg:grid-cols-4">

      {/* Total Revenue */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="font-medium">Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-bold tabular-nums">
            ৳{stats.totalRevenue.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <IconTrendingUp className="size-3 mr-1" /> +12%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
          Updated just now
        </CardFooter>
      </Card>

      {/* Total Orders */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="font-medium">Total Orders</CardDescription>
          <CardTitle className="text-2xl font-bold tabular-nums">
            {stats.totalOrders}
          </CardTitle>
          <CardAction>
            <div className="p-2 bg-blue-50 rounded-lg">
              <IconShoppingCart className="size-5 text-blue-600" />
            </div>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
          Total sales count
        </CardFooter>
      </Card>

      {/* Total Medicines */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="font-medium">Listed Medicines</CardDescription>
          <CardTitle className="text-2xl font-bold tabular-nums">
            {stats.totalMedicines}
          </CardTitle>
          <CardAction>
            <div className="p-2 bg-emerald-50 rounded-lg">
              <IconMedicineSyrup className="size-5 text-emerald-600" />
            </div>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
          Items in your shop
        </CardFooter>
      </Card>

      {/* Rating */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="font-medium">Avg. Rating</CardDescription>
          <CardTitle className="text-2xl font-bold tabular-nums">
            {stats.averageRating.toFixed(1)} <span className="text-sm text-muted-foreground font-normal">/ 5</span>
          </CardTitle>
          <CardAction>
            <div className="p-2 bg-yellow-50 rounded-lg">
              <IconStar className="size-5 fill-yellow-500 text-yellow-500" />
            </div>
          </CardAction>
        </CardHeader>
        <CardFooter className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
          From {stats.totalReviews} reviews
        </CardFooter>
      </Card>

    </div>
  );
}