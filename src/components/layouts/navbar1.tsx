"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import ShoppingCartSheet from "../modules/cart/cart";
import { authClient } from "@/lib/auth-client";
import { DropdownMenuAvatar } from "./avatarDropDown";

interface NavItem {
  title: string;
  url: string;
}

const navItems: NavItem[] = [
  { title: "Home", url: "/" },
  { title: "Medicine", url: "/medicine" },
  { title: "About", url: "/about" },
  { title: "Contact", url: "/contact" },
];

export function Navbar() {
  const session = authClient.useSession();
  const user = session.data?.user;
  const isPending = session.isPending;

  const pathname = usePathname();

  const isActive = (url: string) =>
    url === "/" ? pathname === "/" : pathname.startsWith(url);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#f8fafc]/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">

          {/* LEFT: Logo + Nav */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="MediCorner" width={80} height={80} priority />
              <div className="leading-tight hidden md:block">
                <p className="text-2xl font-bold text-[#15a215] ">MediCorner</p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive(item.url)
                      ? "bg-[#22c55e] text-white"
                      : "text-[#0f172a] hover:bg-green-50 hover:text-[#22c55e]"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-3">

            {/* ১. ইউজার লগইন থাকলে Cart এবং Avatar দেখাবে */}
            {!isPending && user ? (
              <>
                <ShoppingCartSheet />
                <DropdownMenuAvatar />
              </>
            ) : !isPending ? (
              /* ২. ইউজার লগইন না থাকলে Login/Signup বাটন দেখাবে (Desktop) */
              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-[#22c55e] text-[#22c55e] hover:bg-green-50"
                >
                  <Link href="/login">
                    <User className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>

                <Button
                  size="sm"
                  asChild
                  className="bg-[#22c55e] hover:bg-green-600 text-white"
                >
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            ) : (
              /* লোডিং স্টেট (Optional) */
              <div className="h-8 w-8 animate-pulse bg-slate-200 rounded-full" />
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px] px-4">
                <div className="flex h-full flex-col">
                  <div className="flex items-center pb-6 border-b">
                    <Image src="/logo.png" alt="MediCorner" width={60} height={60} />
                    <p className="text-xl font-bold text-[#22c55e] font-syne">MediCorner</p>
                  </div>

                  <nav className="space-y-1 pt-4">
                    {navItems.map((item) => (
                      <SheetClose asChild key={item.title}>
                        <Link
                          href={item.url}
                          className={cn(
                            "block rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                            isActive(item.url)
                              ? "bg-green-50 text-[#22c55e]"
                              : "text-[#0f172a] hover:bg-green-50 hover:text-[#22c55e]"
                          )}
                        >
                          {item.title}
                        </Link>
                      </SheetClose>
                    ))}

                    {/* মোবাইল সেশনে ইউজার না থাকলে বাটন দেখাবে */}
                    {!isPending && !user && (
                      <div className="pt-4 space-y-3 border-t mt-4">
                        <SheetClose asChild>
                          <Button variant="outline" className="w-full border-[#22c55e] text-[#22c55e]" asChild>
                            <Link href="/login">Login</Link>
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button className="w-full bg-[#22c55e] text-white" asChild>
                            <Link href="/register">Create Account</Link>
                          </Button>
                        </SheetClose>
                      </div>
                    )}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}