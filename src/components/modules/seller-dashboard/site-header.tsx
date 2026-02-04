"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { IconHome, IconBell } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
  const pathname = usePathname();

  
  const getPageTitle = () => {
    if (pathname === "/dashboard/seller-dashboard") return "Seller Overview";
    if (pathname.includes("/orders")) return "Order Management";
    if (pathname.includes("/medicine")) return "Medicine Inventory";
    return "Dashboard";
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white sticky top-0 z-10 transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        {/* Sidebar Collapse Toggle */}
        <SidebarTrigger className="-ml-1" />

        <Separator
          orientation="vertical"
          className="mx-2 h-4"
        />

        {/* Dynamic Breadcrumb/Title */}
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-semibold text-slate-900 md:text-base">
            {getPageTitle()}
          </h1>
        </div>

        {/* Right Side Actions */}
        <div className="ml-auto flex items-center gap-3">
          {/* Back to Home Button */}
          <Button
            variant="outline"
            size="sm"
            asChild
            className="hidden md:flex gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
          >
            <Link href="/">
              <IconHome size={18} />
              <span>Visit Website</span>
            </Link>
          </Button>

          {/* Notifications (Optional but looks good) */}
          <Button variant="ghost" size="icon" className="text-slate-500">
            <IconBell size={20} />
          </Button>
        </div>
      </div>
    </header>
  )
}