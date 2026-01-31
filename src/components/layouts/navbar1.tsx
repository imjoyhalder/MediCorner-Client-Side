// "use client";

// import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";

// import { cn } from "@/lib/utils";

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Button } from "@/components/ui/button";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from "@/components/ui/navigation-menu";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";

// interface MenuItem {
//   title: string;
//   url: string;
//   description?: string;
//   icon?: React.ReactNode;
//   items?: MenuItem[];
// }

// interface Navbar1Props {
//   className?: string;
//   logo?: {
//     url: string;
//     src: string;
//     alt: string;
//     title: string;
//     className?: string;
//   };
//   menu?: MenuItem[];
//   auth?: {
//     login: {
//       title: string;
//       url: string;
//     };
//     signup: {
//       title: string;
//       url: string;
//     };
//   };
// }

// const Navbar1 = ({
//   logo = {
//     url: "https://www.shadcnblocks.com",
//     src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
//     alt: "logo",
//     title: "Shadcnblocks.com",
//   },
//   menu = [
//     { title: "Home", url: "/" },
//     {
//       title: "Products",
//       url: "#",
//       items: [
//         {
//           title: "Blog",
//           description: "The latest industry news, updates, and info",
//           icon: <Book className="size-5 shrink-0" />,
//           url: "#",
//         },
//         {
//           title: "Company",
//           description: "Our mission is to innovate and empower the world",
//           icon: <Trees className="size-5 shrink-0" />,
//           url: "#",
//         },
//         {
//           title: "Careers",
//           description: "Browse job listing and discover our workspace",
//           icon: <Sunset className="size-5 shrink-0" />,
//           url: "#",
//         },
//         {
//           title: "Support",
//           description:
//             "Get in touch with our support team or visit our community forums",
//           icon: <Zap className="size-5 shrink-0" />,
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Resources",
//       url: "#",
//       items: [
//         {
//           title: "Help Center",
//           description: "Get all the answers you need right here",
//           icon: <Zap className="size-5 shrink-0" />,
//           url: "#",
//         },
//         {
//           title: "Contact Us",
//           description: "We are here to help you with any questions you have",
//           icon: <Sunset className="size-5 shrink-0" />,
//           url: "#",
//         },
//         {
//           title: "Status",
//           description: "Check the current status of our services and APIs",
//           icon: <Trees className="size-5 shrink-0" />,
//           url: "#",
//         },
//         {
//           title: "Terms of Service",
//           description: "Our terms and conditions for using our services",
//           icon: <Book className="size-5 shrink-0" />,
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Pricing",
//       url: "#",
//     },
//     {
//       title: "Blog",
//       url: "#",
//     },
//   ],
//   auth = {
//     login: { title: "Login", url: "/login" },
//     signup: { title: "Sign up", url: "/register" },
//   },
//   className,
// }: Navbar1Props) => {
//   return (
//     <section className={cn("py-4", className)}>
//       <div className="container">
//         {/* Desktop Menu */}
//         <nav className="hidden items-center justify-between lg:flex">
//           <div className="flex items-center gap-6">
//             {/* Logo */}
//             <a href={logo.url} className="flex items-center gap-2">
//               <img
//                 src={logo.src}
//                 className="max-h-8 dark:invert"
//                 alt={logo.alt}
//               />
//               <span className="text-lg font-semibold tracking-tighter">
//                 {logo.title}
//               </span>
//             </a>
//             <div className="flex items-center">
//               <NavigationMenu>
//                 <NavigationMenuList>
//                   {menu.map((item) => renderMenuItem(item))}
//                 </NavigationMenuList>
//               </NavigationMenu>
//             </div>
//           </div>
//           <div className="flex gap-2">
//             <Button asChild variant="outline" size="sm">
//               <a href={auth.login.url}>{auth.login.title}</a>
//             </Button>
//             <Button asChild size="sm">
//               <a href={auth.signup.url}>{auth.signup.title}</a>
//             </Button>
//           </div>
//         </nav>

//         {/* Mobile Menu */}
//         <div className="block lg:hidden">
//           <div className="flex items-center justify-between">
//             {/* Logo */}
//             <a href={logo.url} className="flex items-center gap-2">
//               <img
//                 src={logo.src}
//                 className="max-h-8 dark:invert"
//                 alt={logo.alt}
//               />
//             </a>
//             <Sheet>
//               <SheetTrigger asChild>
//                 <Button variant="outline" size="icon">
//                   <Menu className="size-4" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent className="overflow-y-auto">
//                 <SheetHeader>
//                   <SheetTitle>
//                     <a href={logo.url} className="flex items-center gap-2">
//                       <img
//                         src={logo.src}
//                         className="max-h-8 dark:invert"
//                         alt={logo.alt}
//                       />
//                     </a>
//                   </SheetTitle>
//                 </SheetHeader>
//                 <div className="flex flex-col gap-6 p-4">
//                   <Accordion
//                     type="single"
//                     collapsible
//                     className="flex w-full flex-col gap-4"
//                   >
//                     {menu.map((item) => renderMobileMenuItem(item))}
//                   </Accordion>

//                   <div className="flex flex-col gap-3">
//                     <Button asChild variant="outline">
//                       <a href={auth.login.url}>{auth.login.title}</a>
//                     </Button>
//                     <Button asChild>
//                       <a href={auth.signup.url}>{auth.signup.title}</a>
//                     </Button>
//                   </div>
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const renderMenuItem = (item: MenuItem) => {
//   if (item.items) {
//     return (
//       <NavigationMenuItem key={item.title}>
//         <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
//         <NavigationMenuContent className="bg-popover text-popover-foreground">
//           {item.items.map((subItem) => (
//             <NavigationMenuLink asChild key={subItem.title} className="w-80">
//               <SubMenuLink item={subItem} />
//             </NavigationMenuLink>
//           ))}
//         </NavigationMenuContent>
//       </NavigationMenuItem>
//     );
//   }

//   return (
//     <NavigationMenuItem key={item.title}>
//       <NavigationMenuLink
//         href={item.url}
//         className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
//       >
//         {item.title}
//       </NavigationMenuLink>
//     </NavigationMenuItem>
//   );
// };

// const renderMobileMenuItem = (item: MenuItem) => {
//   if (item.items) {
//     return (
//       <AccordionItem key={item.title} value={item.title} className="border-b-0">
//         <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
//           {item.title}
//         </AccordionTrigger>
//         <AccordionContent className="mt-2">
//           {item.items.map((subItem) => (
//             <SubMenuLink key={subItem.title} item={subItem} />
//           ))}
//         </AccordionContent>
//       </AccordionItem>
//     );
//   }

//   return (
//     <a key={item.title} href={item.url} className="text-md font-semibold">
//       {item.title}
//     </a>
//   );
// };

// const SubMenuLink = ({ item }: { item: MenuItem }) => {
//   return (
//     <a
//       className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
//       href={item.url}
//     >
//       <div className="text-foreground">{item.icon}</div>
//       <div>
//         <div className="text-sm font-semibold">{item.title}</div>
//         {item.description && (
//           <p className="text-sm leading-snug text-muted-foreground">
//             {item.description}
//           </p>
//         )}
//       </div>
//     </a>
//   );
// };

// export { Navbar1 };

// "use client";

// import React from "react";
// import { usePathname } from "next/navigation";
// import { Menu } from "lucide-react";

// import { cn } from "@/lib/utils";

// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from "@/components/ui/navigation-menu";

// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// interface MenuItem {
//   title: string;
//   url: string;
//   items?: MenuItem[];
// }

// const menu: MenuItem[] = [
//   { title: "Home", url: "/" },
//   { title: "Medicines", url: "/medicines" },
//   { title: "Categories", url: "/categories" },
//   { title: "About", url: "/about" },
// ];

// export function Navbar1() {
//   const pathname = usePathname();

//   const isActive = (url: string) => pathname === url;

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
//       <div className="container flex h-16 items-center px-4 mx-auto justify-between">
//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-2">
//           <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
//             M
//           </div>
//           <span className="text-lg font-semibold tracking-tight">
//             MediCorner
//           </span>
//         </Link>

//         {/* Desktop Menu */}
//         <NavigationMenu className="hidden lg:flex">
//           <NavigationMenuList>
//             {menu.map((item) => (
//               <NavigationMenuItem key={item.title}>
//                 <NavigationMenuLink
//                   href={item.url}
//                   className={cn(
//                     "px-4 py-2 text-sm font-medium rounded-md transition-colors",
//                     isActive(item.url)
//                       ? "bg-primary text-primary-foreground"
//                       : "hover:bg-muted"
//                   )}
//                 >
//                   {item.title}
//                 </NavigationMenuLink>
//               </NavigationMenuItem>
//             ))}
//           </NavigationMenuList>
//         </NavigationMenu>

//         {/* Auth buttons */}
//         <div className="hidden lg:flex gap-2">
//           <Button
//             variant={isActive("/login") ? "default" : "outline"}
//             size="sm"
//             asChild
//           >
//             <a href="/login">Login</a>
//           </Button>

//           <Button
//             variant={isActive("/register") ? "default" : "secondary"}
//             size="sm"
//             asChild
//           >
//             <a href="/register">Sign up</a>
//           </Button>
//         </div>

//         {/* Mobile Menu (UNCHANGED DESIGN) */}
//         <div className="lg:hidden">
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="outline" size="icon">
//                 <Menu className="h-4 w-4" />
//               </Button>
//             </SheetTrigger>

//             <SheetContent className="overflow-y-auto">
//               <SheetHeader>
//                 <SheetTitle className="flex items-center gap-2">
//                   <div className="h-8 w-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-bold">
//                     M
//                   </div>
//                   MediCorner
//                 </SheetTitle>
//               </SheetHeader>

//               <div className="mt-6 flex flex-col gap-6">
//                 <Accordion type="single" collapsible>
//                   {menu.map((item) => (
//                     <a
//                       key={item.title}
//                       href={item.url}
//                       className={cn(
//                         "block rounded-md px-3 py-2 text-sm font-semibold",
//                         isActive(item.url)
//                           ? "bg-primary text-primary-foreground"
//                           : "hover:bg-muted"
//                       )}
//                     >
//                       {item.title}
//                     </a>
//                   ))}
//                 </Accordion>

//                 <div className="flex flex-col gap-3">
//                   <Button
//                     variant={isActive("/login") ? "default" : "outline"}
//                     asChild
//                   >
//                     <a href="/login">Login</a>
//                   </Button>
//                   <Button
//                     variant={isActive("/register") ? "default" : "secondary"}
//                     asChild
//                   >
//                     <a href="/register">Sign up</a>
//                   </Button>
//                 </div>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   );
// }

// "use client";

// import React, { useState } from "react";
// import { usePathname } from "next/navigation";
// import { Menu, Pill, ShoppingCart, User, Search } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import Link from "next/link";

// interface NavItem {
//   title: string;
//   url: string;
//   icon?: React.ReactNode;
// }

// const navItems: NavItem[] = [
//   { title: "Home", url: "/" },
//   { title: "Shop Medicines", url: "/shop" },
//   { title: "Categories", url: "/categories" },
//   { title: "Doctors", url: "/doctors" },
//   { title: "Lab Tests", url: "/lab-tests" },
//   { title: "Health Blog", url: "/blog" },
// ];

// export function Navbar() {
//   const pathname = usePathname();
//   const [cartCount] = useState(3); // Mock cart count

//   const isActive = (url: string) => {
//     if (url === "/") return pathname === "/";
//     return pathname.startsWith(url);
//   };

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
//       <div className="container mx-auto px-4">

//         {/* Main Navbar */}
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center gap-8">
//             <Link href="/" className="flex items-center gap-3">
//               <div className="h-10 w-10 rounded-lg bg-green-500 flex items-center justify-center">
//                 <Pill className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <span className="text-xl font-bold text-slate-900">MediCare</span>
//                 <span className="block text-xs text-slate-600">Trusted Pharmacy</span>
//               </div>
//             </Link>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex items-center gap-6">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.title}
//                   href={item.url}
//                   className={cn(
//                     "text-sm font-medium transition-colors px-2 py-1 rounded-md",
//                     isActive(item.url)
//                       ? "text-green-600 bg-green-50"
//                       : "text-slate-700 hover:text-green-600 hover:bg-green-50"
//                   )}
//                 >
//                   {item.title}
//                 </Link>
//               ))}
//             </nav>
//           </div>

//           {/* Search Bar */}
//           <div className="hidden md:flex flex-1 max-w-md mx-8">
//             <div className="relative w-full">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
//               <Input
//                 type="search"
//                 placeholder="Search medicines, categories..."
//                 className="pl-10 w-full border-slate-300 focus:border-green-500"
//               />
//             </div>
//           </div>

//           {/* Right Actions */}
//           <div className="flex items-center gap-4">
//             {/* Cart */}
//             <Link href="/cart" className="relative">
//               <Button variant="ghost" size="icon" className="relative">
//                 <ShoppingCart className="h-5 w-5 text-slate-700" />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
//                     {cartCount}
//                   </span>
//                 )}
//               </Button>
//             </Link>

//             {/* Auth Buttons - Desktop */}
//             <div className="hidden md:flex items-center gap-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 asChild
//                 className="border-green-500 text-green-500 hover:bg-green-50"
//               >
//                 <Link href="/login">
//                   <User className="h-4 w-4 mr-2" />
//                   Login
//                 </Link>
//               </Button>
//               <Button
//                 size="sm"
//                 className="bg-green-500 hover:bg-green-600"
//                 asChild
//               >
//                 <Link href="/register">Sign Up</Link>
//               </Button>
//             </div>

//             {/* Mobile Menu Button */}
//             <Sheet>
//               <SheetTrigger asChild className="lg:hidden">
//                 <Button variant="ghost" size="icon">
//                   <Menu className="h-5 w-5" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="right" className="w-[300px] sm:w-[350px]">
//                 <div className="flex flex-col h-full">
//                   {/* Mobile Logo */}
//                   <div className="flex items-center gap-3 pb-6 border-b">
//                     <div className="h-10 w-10 rounded-lg bg-green-500 flex items-center justify-center">
//                       <Pill className="h-6 w-6 text-white" />
//                     </div>
//                     <div>
//                       <span className="text-lg font-bold text-slate-900">MediCare</span>
//                       <span className="block text-xs text-slate-600">Trusted Pharmacy</span>
//                     </div>
//                   </div>

//                   {/* Mobile Search */}
//                   <div className="py-4">
//                     <div className="relative">
//                       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
//                       <Input
//                         type="search"
//                         placeholder="Search medicines..."
//                         className="pl-10 w-full"
//                       />
//                     </div>
//                   </div>

//                   {/* Mobile Navigation */}
//                   <nav className="flex-1 py-4">
//                     <div className="space-y-1">
//                       {navItems.map((item) => (
//                         <Link
//                           key={item.title}
//                           href={item.url}
//                           className={cn(
//                             "flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors",
//                             isActive(item.url)
//                               ? "text-green-600 bg-green-50"
//                               : "text-slate-700 hover:text-green-600 hover:bg-green-50"
//                           )}
//                         >
//                           {item.title}
//                         </Link>
//                       ))}
//                     </div>

//                     {/* Mobile Additional Links */}
//                     <div className="mt-8 space-y-2">
//                       <Link
//                         href="/seller"
//                         className="block px-3 py-2 text-sm text-slate-700 hover:text-green-600"
//                       >
//                         Become a Seller
//                       </Link>
//                       <Link
//                         href="/help"
//                         className="block px-3 py-2 text-sm text-slate-700 hover:text-green-600"
//                       >
//                         Need Help?
//                       </Link>
//                     </div>
//                   </nav>

//                   {/* Mobile Auth Buttons */}
//                   <div className="pt-4 border-t space-y-3">
//                     <Button
//                       variant="outline"
//                       className="w-full justify-center border-green-500 text-green-500 hover:bg-green-50"
//                       asChild
//                     >
//                       <Link href="/login">
//                         <User className="h-4 w-4 mr-2" />
//                         Login
//                       </Link>
//                     </Button>
//                     <Button
//                       className="w-full justify-center bg-green-500 hover:bg-green-600"
//                       asChild
//                     >
//                       <Link href="/register">Create Account</Link>
//                     </Button>
//                   </div>
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// // Truck icon component (since it wasn't imported)
// const Truck = ({ className }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className}
//   >
//     <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
//     <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" />
//     <circle cx="7" cy="18" r="2" />
//     <circle cx="17" cy="18" r="2" />
//   </svg>
// );

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, User, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

interface NavItem {
  title: string;
  url: string;
}

const navItems: NavItem[] = [
  { title: "Home", url: "/" },
  { title: "Shop", url: "/shop" },
  { title: "About", url: "/about" },
  { title: "Contact", url: "/contact" },
  { title: "Health Blog", url: "/blog" },
];

export function Navbar() {
  const pathname = usePathname();
  const [cartCount] = useState(3);

  const isActive = (url: string) =>
    url === "/" ? pathname === "/" : pathname.startsWith(url);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#f8fafc]/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">

          {/* LEFT: Logo + Menu */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center ">
              <Image
                src="/logo.png"
                alt="MediCorner"
                width={80}
                height={80}
                priority
              />
              <div className="leading-tight hidden md:block">
                <p className="text-2xl font-bold text-[#15a215]">
                  MediCorner
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
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

          {/* CENTER: Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-10">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search medicines, categories..."
                className="pl-9 bg-white border-slate-300 focus-visible:ring-[#22c55e]"
              />
            </div>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-8 w-8 text-[#0f172a]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#22c55e] text-[10px] text-white">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Desktop Auth */}
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

            {/* Mobile Menu (UNCHANGED DESIGN) */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px] sm:w-[350px] px-2">
                <div className="flex h-full flex-col">

                  {/* Mobile Logo */}
                  <div className="flex items-center  pb-6 border-b">
                    <Image
                      src="/logo.png"
                      alt="MediCorner"
                      width={70}
                      height={70}
                    />
                    <p className="text-xl font-bold text-[#22c55e]">
                      MediCorner
                    </p>
                  </div>

                  {/* Mobile Search */}
                  <div className="py-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search medicines..."
                        className="pl-9 focus-visible:ring-[#22c55e]"
                      />
                    </div>
                  </div>

                  {/* Mobile Nav */}
                  <nav className="space-y-1">
                    {navItems.map((item) => (
                      // <Link
                      //   key={item.title}
                      //   href={item.url}
                      //   className={cn(
                      //     "block rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                      //     isActive(item.url)
                      //       ? "bg-green-50 text-[#22c55e]"
                      //       : "text-[#0f172a] hover:bg-green-50 hover:text-[#22c55e]"
                      //   )}
                      // >
                      //   {item.title}
                      // </Link>
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

                    {/* Auth buttons – right after menu */}
                    <div className="pt-4 space-y-3">
                      {/* Login Button */}
                      <SheetClose asChild>
                        <Button
                          variant="outline"
                          className="w-full border-[#22c55e] text-[#22c55e] hover:bg-green-50"
                          asChild
                        >
                          <Link href="/login">Login</Link>
                        </Button>
                      </SheetClose>

                      {/* Create Account Button */}
                      <SheetClose asChild>
                        <Button
                          className="w-full bg-[#22c55e] text-white hover:bg-green-600"
                          asChild
                        >
                          <Link href="/register">Create Account</Link>
                        </Button>
                      </SheetClose>
                    </div>
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
