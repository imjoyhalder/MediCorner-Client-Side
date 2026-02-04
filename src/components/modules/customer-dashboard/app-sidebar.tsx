"use client";

import * as React from "react";
import { LayoutDashboard, ShoppingBag, UserCircle, Heart } from "lucide-react";
import {
    Sidebar, SidebarContent, SidebarHeader, SidebarMenu,
    SidebarMenuButton, SidebarMenuItem, SidebarGroup
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const customerNav = [
    { title: "Overview", url: "/dashboard/customer-dashboard", icon: LayoutDashboard },
    { title: "My Orders", url: "/dashboard/customer-dashboard/orders", icon: ShoppingBag },
    { title: "Profile", url: "/dashboard/customer-dashboard/profile", icon: UserCircle },
    { title: "Wishlist", url: "/dashboard/customer-dashboard/wishlist", icon: Heart },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();

    return (
        <Sidebar collapsible="icon" variant="inset" {...props}>
            <SidebarHeader className="h-16 flex items-center justify-center border-b border-slate-50">
                <span className="font-black text-[#15a215] tracking-tighter text-lg  group-data-[collapsible=icon]:hidden">
                    Your Dashboard
                </span>
            </SidebarHeader>
            <SidebarContent className="mt-6 px-2">
                <SidebarGroup>
                    <SidebarMenu className="gap-3">
                        {customerNav.map((item) => {
                            // Link active kina seta check korar logic
                            const isActive = pathname === item.url;
                            
                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive}
                                        tooltip={item.title}
                                        className={`
                                            h-12 rounded-xl transition-all duration-200
                                            ${isActive 
                                                ? "bg-[#15a215]/10 text-[#15a215] shadow-sm ring-1 ring-[#15a215]/20" 
                                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
                                        `}
                                    >
                                        <Link href={item.url} className="flex items-center gap-3 w-full relative">
                                            <item.icon className={`size-5 ${isActive ? "text-[#15a215]" : "text-slate-400"}`} />
                                            <span className={`font-bold text-sm ${isActive ? "text-[#15a215]" : ""}`}>
                                                {item.title}
                                            </span>
                                            
                                            {/* Active Indicator Line (Industry Standard) */}
                                            {isActive && (
                                                <div className="absolute -left-2 w-1 h-6 bg-[#15a215] rounded-full group-data-[collapsible=icon]:hidden" />
                                            )}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}