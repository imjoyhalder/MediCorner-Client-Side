import FooterSection from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar1";
import type { ReactNode } from "react";

interface PublicLayoutProps {
    children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-1 bg-gradient-to-r from-green-100 to-green-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <FooterSection />
        </div>
    );
}
