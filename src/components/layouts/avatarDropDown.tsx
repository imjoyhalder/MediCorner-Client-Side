"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    BadgeCheckIcon,
    BellIcon,
    CreditCardIcon,
    LogOutIcon,
    UserIcon
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function DropdownMenuAvatar() {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/"); // লগআউট সফল হলে হোমপেজে পাঠাবে
                    router.refresh();
                },
            },
        });
    };

    // ইউজারের নামের প্রথম দুই অক্ষর ফলব্যাক হিসেবে দেখানোর জন্য
    const userInitials = user?.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full ring-offset-background focus-visible:ring-[#22c55e]">
                    <Avatar className="h-9 w-9 border border-slate-200">
                        <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
                        <AvatarFallback className="bg-green-50 text-[#22c55e] font-bold">
                            {userInitials}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-lg border-slate-100">
                {/* ইউজারের নাম এবং ইমেইল সেকশন */}
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1 p-1">
                        <p className="text-sm font-bold leading-none text-slate-900 font-syne capitalize">{user?.name}</p>
                        <p className="text-xs leading-none text-slate-500">{user?.email}</p>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem asChild className="cursor-pointer focus:bg-green-50 focus:text-[#22c55e]">
                        <Link href="/dashboard" className="flex w-full items-center">
                            <BadgeCheckIcon className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="cursor-pointer focus:bg-green-50 focus:text-[#22c55e]">
                        <CreditCardIcon className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="cursor-pointer focus:bg-green-50 focus:text-[#22c55e]">
                        <BellIcon className="mr-2 h-4 w-4" />
                        <span>Notifications</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-rose-500 focus:bg-rose-50 focus:text-rose-600 font-medium"
                >
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}