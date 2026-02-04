
"use client";

import * as React from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Settings,
  Grid3X3,
  Home,
  LogOut,
} from "lucide-react";

import { NavMain, type NavItem } from "./nav-main";
// import { NavUser } from "./nav-user"; // Seller dashboard theke niye asha
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { NavUser } from "@/components/modules/seller-dashboard/nav-user";
import { ScrollArea } from "@/components/ui/scroll-area";

const adminNav: NavItem[] = [
  {
    title: "Overview",
    url: "/dashboard/admin-dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Order Management",
    url: "/dashboard/admin-dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "User Management",
    url: "/dashboard/admin-dashboard/users",
    icon: Users,
  },
  {
    title: "Categories",
    url: "/dashboard/admin-dashboard/category",
    icon: Grid3X3,
  },
  {
    title: "System Settings",
    url: "/dashboard/admin-dashboard/settings",
    icon: Settings,
  },
];

const secondaryNav = [
    {
        title: "Back to Home",
        url: "/",
        icon: Home
    }
]

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" className="border-r-0" {...props}>
      <SidebarHeader className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-transparent px-0">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-[#15a215]/10 text-[#15a215]">
                  <Image src="/logo.png" alt="Logo" width={32} height={32} />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="text-lg font-bold tracking-tight text-[#15a215]">
                    MediCorner
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
                    Administrator
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="px-2">
          <NavMain items={adminNav} />
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border/50">
        <NavUser user={{
            name: "Admin Panel",
            email: "admin@medicorner.com",
            avatar: "/admin-avatar.png"
        }} />
      </SidebarFooter>
    </Sidebar>
  );
}