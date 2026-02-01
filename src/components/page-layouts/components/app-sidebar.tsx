"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import Image from "next/image";

// const data = {
//   navMain: [
//     {
//       title: "Overview",
//       url: "#",
//       icon: SquareTerminal
//     },
//     {
//       title: "Orders",
//       url: "#",
//       icon: Bot
//     },
//     {
//       title: "Users",
//       url: "#",
//       icon: BookOpen
//     },
//     {
//       title: "Settings",
//       url: "#",
//       icon: Settings2
//     }
//   ],
//   projects: [
//     {
//       name: "Design Engineering",
//       url: "#",
//       icon: Frame
//     },
//     {
//       name: "Sales & Marketing",
//       url: "#",
//       icon: PieChart
//     },
//     {
//       name: "Travel",
//       url: "#",
//       icon: Map
//     }
//   ]
// };

const data = {
  navMain: [
    {
      title: "Overview",
      url: "/dashboard/admin-dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Orders",
      url: "/dashboard/admin-dashboard/orders",
      icon: Bot,
    },
    {
      title: "Users",
      url: "/dashboard/admin-dashboard/users",
      icon: BookOpen,
    },
    {
      title: "Settings",
      url: "/dashboard/admin-dashboard/settings",
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <Link href="/" className="flex items-center ">
                    <Image
                      src="/logo.png"
                      alt="MediCorner"
                      width={50}
                      height={50}
                      priority
                    />
                    <div className="leading-tight hidden md:block">
                      <p className="text-md  text-[#15a215]">
                        MediCorner
                      </p>
                    </div>
                  </Link>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-full">
          <NavMain items={data.navMain} />
          {/* <NavProjects projects={data.projects} /> */}
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
