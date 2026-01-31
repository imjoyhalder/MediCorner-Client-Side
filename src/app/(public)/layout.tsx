
import { Navbar } from "@/components/layouts/navbar1"
import type { ReactNode } from "react"


interface PublicLayoutProps {
    children: ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <div >
            {/* Navbar */}
            <Navbar  />

            {/* Main Content */}
            <div className="bg-gradient-to-r from-green-100 to-green-50 ">
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>

            {/* Footer */}
            {/* <Footer /> */}
        </div>
    )
}
