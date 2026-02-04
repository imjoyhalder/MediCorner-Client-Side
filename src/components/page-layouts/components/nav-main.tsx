
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
};

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <SidebarGroup className="py-0">
      <SidebarGroupLabel className="px-2 pb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/50">
        Main Menu
      </SidebarGroupLabel>
      <SidebarMenu className="gap-1">
        {items.map((item) => {
          const isActive = pathname === item.url;
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={item.title}
                className={`
                  h-10 px-3 transition-all duration-200
                  ${isActive
                    ? "bg-[#15a215]/10 text-[#15a215] font-semibold shadow-sm"
                    : "hover:bg-slate-100 text-black"}
                `}
              >
                <Link href={item.url} className="flex items-center gap-3">
                  <item.icon className={`size-5 ${isActive ? "text-[#15a215]" : "text-slate-400"}`} />
                  <span className="text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}