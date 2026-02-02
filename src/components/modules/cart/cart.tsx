
"use client";

import { useState, useEffect } from "react";
import { ShoppingCartIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";

import { CartItem, CartListItem } from "./cart-item";
import { getCart } from "@/services/cart.service";
import { placeOrder } from "@/services/order.service";

export default function ShoppingCartSheet() {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [address, setAddress] = useState("");


    const fetchCart = async () => {
        const res = await getCart();
        if (res.success) {
            setCart(res.data.items || []);
        } else {
            setCart([]);
        }
    };
    // console.log(cart);


    useEffect(() => {
        if (!isOpen) return;

        let mounted = true;

        (async () => {
            const res = await getCart();
            if (!mounted) return;

            if (res.success) {
                setCart(res.data.items || []);
            } else {
                setCart([]);
            }
        })();

        return () => {
            mounted = false;
        };
    }, [isOpen]);

    const total = cart.reduce(
        (sum, item) => sum + item.sellerMedicine.price * item.quantity,
        0
    );

    const handlePlaceOrder = async () => {
        if (!address) {
            return toast.error("Please enter shipping address");
        }

        const toastId = toast.loading("Placing your order...");

        try {
            const res = await placeOrder(address);

            if (!res.success) {
                toast.error(res.message || "Failed to place order", { id: toastId });
                return;
            }

            toast.success("Order placed successfully! (Cash on Delivery)", {
                id: toastId,
            });
            window.location.replace("/dashboard/user-dashboard");


        } catch {
            toast.error("Something went wrong", { id: toastId });
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCartIcon className="h-5 w-5" />
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                        {cart.length}
                    </span>
                </Button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="flex w-full max-w-md flex-col p-0 sm:max-w-lg"
            >

                <DialogTitle className="sr-only">
                    Shopping Cart
                </DialogTitle>

                {/* Header */}
                <div className="border-b px-6 py-4">
                    <h2 className="text-lg font-semibold text-[#0f172a]">
                        Shopping Cart
                    </h2>
                </div>

                {/* Cart items */}
                <div className="flex-1 overflow-y-auto px-6">
                    {cart.length === 0 ? (
                        <p className="py-10 text-center text-sm text-muted-foreground">
                            Your cart is empty
                        </p>
                    ) : (
                        <div className="divide-y">
                            {cart.map((item) => (
                                <div key={item.id} className="py-4">
                                    <CartListItem
                                        item={item}
                                        refreshCart={fetchCart}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Shipping address */}
                <div className="border-t px-6 py-4 bg-[#f8fafc]">
                    <h3 className="text-sm font-medium text-green-500">
                        Shipping address
                    </h3>

                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="mt-2 w-full rounded-md border px-3 py-2 text-sm text-[#0f172a]"
                    />

                    <p className="mt-3 text-xs text-[#0f172a]">
                        Payment method:{" "}
                        <span className="font-semibold">
                            Cash on Delivery
                        </span>
                    </p>
                </div>

                {/* Order summary */}
                <div className="border-t bg-muted/40 px-6 py-6">
                    <div className="flex justify-between text-base font-semibold">
                        <span>Total</span>
                        <span>৳{total}</span>
                    </div>

                    <Button
                        className="mt-5 w-full bg-green-500 hover:bg-green-600 text-white"
                        size="lg"
                        disabled={!address || cart.length === 0}
                        onClick={handlePlaceOrder}
                    >
                        Place Order
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
