
import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediCorner",
  description: "Your trusted medicine shop",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${syne.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Top Progress Bar: Er fole setState error ar ashbe na */}
        <NextTopLoader
          color="#10b981"
          showSpinner={false}
          shadow="0 0 10px #10b981,0 0 5px #10b981"
        />

        {children}
        <Analytics />
        <Toaster richColors />
      </body>
    </html>
  );
}