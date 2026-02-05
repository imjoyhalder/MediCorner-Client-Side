"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
            {/* Animated 404 Text/Icon */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative mb-8"
            >
                <div className="text-[120px] font-black leading-none text-emerald-500/10 sm:text-[180px]">
                    404
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                        src="/logo.png"
                        alt="MediCorner Logo"
                        width={80}
                        height={80}
                        className="animate-pulse rounded-2xl shadow-xl shadow-emerald-500/20"
                    />
                </div>
            </motion.div>

            {/* Message */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="max-w-md"
            >
                <h2 className="font-syne text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Oops! Page Not Found
                </h2>

            </motion.div>

            {/* Action Buttons */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
                <Button asChild variant="default" className="bg-emerald-600 hover:bg-emerald-700 h-12 px-8 rounded-full">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Home className="size-4" />
                        Back to Home
                    </Link>
                </Button>

                <Button
                    variant="outline"
                    onClick={() => window.history.back()}
                    className="h-12 px-8 rounded-full border-emerald-200 hover:bg-emerald-50"
                >
                    <div className="flex items-center gap-2 font-semibold text-emerald-700">
                        <ArrowLeft className="size-4" />
                        Go Back
                    </div>
                </Button>
            </motion.div>

            {/* Minimal Footer */}
            <p className="mt-20 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
                MediCorner - Your Trusted Pharma Partner
            </p>
        </div>
    );
}