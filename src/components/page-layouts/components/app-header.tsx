
"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function AppHeader() {
  const pathname = usePathname();
  const currentPath = pathname.split("/").pop()?.replace("-", " ") || "Overview";

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 px-4 backdrop-blur-md">
      <div className="flex w-full items-center gap-2">
        <SidebarTrigger className="-ml-1 text-slate-500 hover:text-[#15a215] transition-colors" />
        <Separator orientation="vertical" className="mx-2 h-4 bg-slate-200" />
        
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Dashboard</span>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-slate-300" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-sm font-bold capitalize tracking-tight text-slate-800">
                {currentPath}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Action Buttons */}
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden md:flex h-8 items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
            <div className="h-2 w-2 animate-pulse rounded-full bg-[#15a215]" />
            <span className="text-[10px] font-bold uppercase tracking-tight text-slate-500">System Live</span>
          </div>
        </div>
      </div>
    </header>
  );
}