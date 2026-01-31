// "use client";

// import React from "react";
// import { Info, ShoppingCartIcon } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import {
//     Tooltip,
//     TooltipContent,
//     TooltipProvider,
//     TooltipTrigger
// } from "@/components/ui/tooltip";

// import { CartItem, cartItems, CartListItem } from "./cart-item";

// export default function ShoppingCartSheet() {
//     const [isOpen, setIsOpen] = React.useState(false); 

//     return (
//         <Sheet open={isOpen} onOpenChange={setIsOpen}>
//             <SheetTrigger asChild>
//                 <Button
//                     variant="ghost"
//                     size="icon"
//                     className="relative"
//                 >
//                     <ShoppingCartIcon className="h-5 w-5" />
//                     <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
//                         {cartItems.length}
//                     </span>
//                 </Button>
//             </SheetTrigger>

//             <SheetContent
//                 side="right"
//                 className="flex w-full max-w-md flex-col p-0 sm:max-w-lg"
//             >
//                 {/* Header */}
//                 <div className="border-b px-6 py-4">
//                     <h2 className="text-lg font-semibold">
//                         Shopping Cart
//                     </h2>
//                 </div>

//                 {/* Cart Items */}
//                 <div className="flex-1 overflow-y-auto px-6">
//                     {cartItems.length === 0 ? (
//                         <p className="py-10 text-center text-sm text-muted-foreground">
//                             Your cart is empty
//                         </p>
//                     ) : (
//                         <div className="divide-y">
//                             {cartItems.map((item: CartItem) => (
//                                 <div key={item.id} className="py-4">
//                                     <CartListItem item={item} />
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>

//                 {/* Order Summary */}
//                 <div className="border-t bg-muted/40 px-6 py-6">
//                     <div className="space-y-3 text-sm">
//                         <div className="flex justify-between">
//                             <span>Subtotal</span>
//                             <span className="font-medium">$255.00</span>
//                         </div>

//                         <div className="flex justify-between">
//                             <span className="flex items-center gap-1">
//                                 Shipping
//                                 <TooltipProvider>
//                                     <Tooltip>
//                                         <TooltipTrigger>
//                                             <Info className="h-3 w-3 text-muted-foreground" />
//                                         </TooltipTrigger>
//                                         <TooltipContent>
//                                             Delivery in 7–10 days
//                                         </TooltipContent>
//                                     </Tooltip>
//                                 </TooltipProvider>
//                             </span>
//                             <span>$5.00</span>
//                         </div>

//                         <div className="flex justify-between">
//                             <span>Tax</span>
//                             <span>$4.50</span>
//                         </div>

//                         <div className="flex justify-between border-t pt-3 text-base font-semibold">
//                             <span>Total</span>
//                             <span>$264.50</span>
//                         </div>
//                     </div>

//                     <Button
//                         className="mt-5 w-full bg-primary hover:bg-primary/90"
//                         size="lg"
//                     >
//                         Proceed to Checkout
//                     </Button>
//                 </div>
//             </SheetContent>
//         </Sheet>
//     );
// }
"use client";

import React, { useState } from "react";
import { Info, ShoppingCartIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";

import { CartItem, cartItems } from "./cart-item";
import { CartListItem } from "./cart-item";

// const calcSubtotal = (items: CartItem[]) => {
//     items.reduce((sum, it) => sum + it.price * it.quantity, 0);
// }



export default function ShoppingCartSheet() {
    const [isOpen, setIsOpen] = useState(false); // reload এ open না করতে false
    const [address, setAddress] = useState("");   // shipping address text
    // const [city, setCity] = useState("");
    // const [phone, setPhone] = useState("");

    // const subtotal = calcSubtotal(cartItems);
    const total = 20000

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                >
                    <ShoppingCartIcon className="h-5 w-5" />
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#22c55e] text-xs text-white">
                        {cartItems.length}
                    </span>
                </Button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="flex w-full max-w-md flex-col p-0 sm:max-w-lg"
            >
                {/* Header */}
                <div className="border-b px-6 py-4">
                    <h2 className="text-lg font-semibold text-[#0f172a]">
                        Shopping Cart
                    </h2>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto px-6">
                    {cartItems.length === 0 ? (
                        <p className="py-10 text-center text-sm text-muted-foreground">
                            Your cart is empty
                        </p>
                    ) : (
                        <div className="divide-y">
                            {cartItems.map((item: CartItem) => (
                                <div key={item.id} className="py-4">
                                    <CartListItem item={item} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Shipping address + COD info */}
                <div className="border-t px-6 py-4 bg-[#f8fafc]">
                    <h3 className="text-sm font-medium text-[#22c55e]">
                        Shipping address
                    </h3>

                    <div className="mt-2 space-y-2">
                        <input
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full rounded-md border px-3 py-2 text-sm text-[#0f172a] placeholder:text-muted-foreground"
                        />
                        {/* <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full rounded-md border px-3 py-2 text-sm text-[#0f172a] placeholder:text-muted-foreground"
                        />
                        <input
                            type="tel"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full rounded-md border px-3 py-2 text-sm text-[#0f172a] placeholder:text-muted-foreground"
                        /> */}
                    </div>

                    {/* COD theme note */}
                    <p className="mt-3 text-xs text-[#0f172a]">
                        Payment method: <span className="font-semibold">Cash on Delivery</span>
                    </p>
                </div>

                {/* Order Summary */}
                <div className="border-t bg-muted/40 px-6 py-6">
                    {/* <div className="space-y-3 text-sm text-[#0f172a]">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-medium"> ৳{subtotal.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="flex items-center gap-1">
                                Shipping
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className="h-3 w-3 text-muted-foreground" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Standard delivery fee
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </span>
                            <span>৳{SHIPPING.toLocaleString()}</span>
                        </div>

                        

                        <div className="flex justify-between border-t pt-3 text-base font-semibold">
                            <span>Total</span>
                            <span>৳{total.toFixed(2)}</span>
                        </div>
                    </div> */}

                    <Button
                        className="mt-5 w-full bg-[#22c55e] hover:bg-[#16a34a] text-white"
                        size="lg"
                        disabled={!address || cartItems.length === 0}
                    >
                        Place Order
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
