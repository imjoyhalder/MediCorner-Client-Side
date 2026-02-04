import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/modules/customer-dashboard/app-sidebar";
import { Navbar } from "@/components/layouts/navbar1";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-[#f8fafc]">
                {/* Mobile Header: Sticky and Compact */}
                <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-white/80 backdrop-blur-md px-4 md:px-6">
                    <SidebarTrigger className="text-[#15a215]" />
                    <div className="flex-1 overflow-hidden">
                        <Navbar />
                    </div>
                </header>

                <main className="flex-1 p-4 md:p-8">
                    <div className="max-w-5xl mx-auto space-y-8">
                        {children}
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}