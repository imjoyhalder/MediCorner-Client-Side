"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function GlobalLoader() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const handleStart = () => setIsLoading(true);
        const handleComplete = () => setIsLoading(false);


        handleStart();


        const timer = setTimeout(handleComplete, 800);

        return () => clearTimeout(timer);
    }, [pathname, searchParams]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <div className="pointer-events-none fixed inset-0 z-[10000]">
                    {/* Top Progress Bar */}
                    <motion.div
                        initial={{ width: "0%", opacity: 1 }}
                        animate={{ width: "100%" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute top-0 left-0 h-[4px] bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]"
                    />

                    {/* Background Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex h-full w-full flex-col items-center justify-center bg-white/50 backdrop-blur-[2px]"
                    >
                        {/* Simple Spinner */}
                        <div className="relative">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                className="size-12 rounded-full border-4 border-emerald-100 border-t-emerald-500"
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}