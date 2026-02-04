"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  IconDashboard,
  IconMedicineSyrup,
  IconShoppingCart,
  IconSettings,
  IconHelp,
  IconHome,
  IconGraph,
} from "@tabler/icons-react"

import { NavMain } from "@/components/modules/seller-dashboard/nav-main"
import { NavSecondary } from "@/components/modules/seller-dashboard/nav-secondary"
import { NavUser } from "@/components/modules/seller-dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Seller Name",
    email: "seller@medicorner.com",
    avatar: "/avatars/seller.jpg",
  },
  navMain: [
    {
      title: "Overview",
      url: "/dashboard/seller-dashboard",
      icon: IconDashboard,
    },
    {
      title: "Medicine Inventory",
      url: "/dashboard/seller-dashboard/medicine",
      icon: IconMedicineSyrup,
    },
    {
      title: "Order Requests",
      url: "/dashboard/seller-dashboard/orders",
      icon: IconShoppingCart,
    },
    {
      title: "Sales Analytics",
      url: "#",
      icon: IconGraph,
    },
  ],
  navSecondary: [
    {
      title: "Back to Home",
      url: "/",
      icon: IconHome,
    },
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Support",
      url: "#",
      icon: IconHelp,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/" className="flex items-center gap-2 p-2">
              <Image src="/logo.png" alt="MediCorner" width={40} height={40} priority />
              <div className="leading-tight group-data-[collapsible=icon]:hidden">
                <p className="text-xl font-bold text-[#15a215]">MediCorner</p>
              </div>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}