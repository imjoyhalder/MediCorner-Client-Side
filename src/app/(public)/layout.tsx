import { Navbar1 } from "@/components/navbar1"
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
            <main className="bg-gradient-to-br from-purple-50 via-pink-50 to-white min-h-screen rounded-xl">
                {children}
            </main>

            {/* Footer */}
            {/* <Footer /> */}
        </div>
    )
}
