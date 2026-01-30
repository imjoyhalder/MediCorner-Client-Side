import { Navbar1 } from "@/components/layouts/navbar1"
import type { ReactNode } from "react"


interface PublicLayoutProps {
    children: ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Navbar */}
            <Navbar1 />

            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            {/* <Footer /> */}
        </div>
    )
}
