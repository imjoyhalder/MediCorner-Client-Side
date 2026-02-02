"use client";

import * as React from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Settings,
  Command,
} from "lucide-react";

import { NavMain, type NavItem } from "./nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

import Link from "next/link";
import Image from "next/image";

/* ------------------ NAV ITEMS (ADMIN) ------------------ */

const adminNav: NavItem[] = [
  {
    title: "Overview",
    url: "/dashboard/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Orders",
    url: "/dashboard/admin-dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "Users",
    url: "/dashboard/admin-dashboard/users",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/dashboard/admin-dashboard/settings",
    icon: Settings,
  },
];

/* ------------------ SIDEBAR ------------------ */

export function AppSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  return (
    <Sidebar variant="inset" {...props}>
      {/* ---------- HEADER ---------- */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link
                href="/"
                className="flex items-center gap-3"
              >
                {/* APP ICON */}
                <div className="flex size-9 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>

                {/* BRAND */}
                <div className="flex items-center gap-2">
                  <Image
                    src="/logo.png"
                    alt="MediCorner"
                    width={36}
                    height={36}
                    priority
                  />
                  <span className="hidden md:block text-sm font-semibold text-[#15a215]">
                    MediCorner
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ---------- CONTENT ---------- */}
      <SidebarContent>
        <ScrollArea className="h-full">
          <NavMain items={adminNav} />
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
