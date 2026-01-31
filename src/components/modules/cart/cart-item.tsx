// import Image from "next/image";
// import { XIcon } from "lucide-react";

// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";

// import { CartItem } from "./type";

export type CartItem = {
    id: number,
    title: string,
    price: string,
    variant: string,
    size: string,
    quantity: number,
    image: string,
    in_stock: boolean,
}

// import { CartItem } from "./type";

export const cartItems: CartItem[] = [
    {
        id: 3,
        title: "Classic Hoodie",
        price: "$45.00",
        variant: "Black",
        size: "Medium",
        quantity: 1,
        image: "/images/products/list1.png",
        in_stock: true
    },
    {
        id: 4,
        title: "Denim Jacket",
        price: "$80.00",
        variant: "Blue",
        size: "Large",
        quantity: 2,
        image: "/images/products/list2.png",
        in_stock: false
    },
    {
        id: 5,
        title: "Slim Fit Jeans",
        price: "$50.00",
        variant: "Dark Wash",
        size: "32",
        quantity: 1,
        image: "/images/products/list3.png",
        in_stock: true
    }
];

// export function CartListItem({ item }: { item: CartItem }) {
//     return (
//         <div className="flex gap-4">
//             <Image
//                 src={item.image}
//                 className="h-16 w-16 rounded-md border object-cover"
//                 width={64}
//                 height={64}
//                 alt={item.title}
//                 unoptimized
//             />

//             <div className="flex flex-1 justify-between">
//                 <div className="space-y-1">
//                     <h3 className="text-sm font-medium leading-tight">
//                         {item.title}
//                     </h3>

//                     <p className="text-xs text-muted-foreground">
//                         {item.variant} • {item.size}
//                     </p>

//                     <p className="text-sm font-semibold text-primary">
//                         {item.price}
//                     </p>

//                     {!item.in_stock && (
//                         <p className="text-xs text-destructive">
//                             Out of stock
//                         </p>
//                     )}
//                 </div>

//                 <div className="flex flex-col items-end gap-2">
//                     <Select defaultValue={String(item.quantity)}>
//                         <SelectTrigger className="h-8 w-[70px]">
//                             <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                             {[1, 2, 3, 4, 5].map(q => (
//                                 <SelectItem key={q} value={String(q)}>
//                                     {q}
//                                 </SelectItem>
//                             ))}
//                         </SelectContent>
//                     </Select>

//                     <Button
//                         variant="ghost"
//                         size="icon"
//                         className="text-muted-foreground hover:text-destructive"
//                     >
//                         <XIcon size={16} />
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// import { CartItem } from "./cart-item";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function CartListItem({ item }: { item: CartItem }) {
    // local quantity state just for demo; replace with global/cart store as needed
    const [qty, setQty] = useState(item.quantity);

    const inc = () => setQty(prev => Math.min(prev + 1, 99));
    const dec = () => setQty(prev => Math.max(prev - 1, 1));

    return (
        <div className="flex gap-4">
            {/* product image */}
            <Image
                src={item.image}
                width={64}
                height={64}
                alt={item.title}
                className="h-16 w-16 rounded-md border object-cover"
                unoptimized
            />

            {/* details */}
            <div className="flex flex-1 justify-between">
                <div className="space-y-1">
                    <h3 className="text-sm font-medium leading-tight text-[#0f172a]">
                        {item.title}
                    </h3>

                    <p className="text-xs text-muted-foreground">
                        {item.variant} • {item.size}
                    </p>

                    <p className="text-sm font-semibold text-[#22c55e]">
                        ৳{item.price.toLocaleString()}
                    </p>

                    {!item.in_stock && (
                        <p className="text-xs text-destructive">
                            Out of stock
                        </p>
                    )}
                </div>

                {/* actions: qty + delete */}
                <div className="flex flex-col items-end gap-2">
                    {/* quantity controls */}
                    <div className="flex items-center space-x-1">
                        <Button
                            variant="outline"
                            size="icon"
                            className="p-1"
                            onClick={dec}
                        >
                            <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-sm">{qty}</span>
                        <Button
                            variant="outline"
                            size="icon"
                            className="p-1"
                            onClick={inc}
                        >
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>

                    {/* delete */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove item</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
