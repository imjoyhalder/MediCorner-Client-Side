
// 'use client';

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Medicine } from "@/types/medicine";
// import { addToCart } from "@/actions/cart.action";
// import { toast } from "sonner";

// // Shadcn UI Components
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// // Lucide Icons
// import { ShoppingCart, Eye, Pill, Factory, Loader2 } from "lucide-react";

// interface MedicineCardProps {
//     medicine: Medicine;
// }

// export function MedicineCard({ medicine }: MedicineCardProps) {
//     const [loading, setLoading] = useState(false);
//     const seller = medicine.sellers[0];
//     const hasStock = seller && seller.stockQuantity > 0;

//     const handleAddToCart = async () => {
//         if (!hasStock) {
//             return toast.error("Out of stock");
//         }

//         setLoading(true);
//         const res = await addToCart(seller.id, 1);
//         setLoading(false);

//         if (!res.success) {
//             toast.warning("Please login to add to cart!");
//             return;
//         }

//         toast.success(res.message);
//     };

//     return (
//         <Card className="group overflow-hidden border-slate-200 transition-all duration-300 hover:shadow-lg hover:border-green-400 bg-white">
//             {/* Image Container */}
//             <CardHeader className="p-0 relative">
//                 <div className="h-40 w-full bg-slate-50 flex items-center justify-center overflow-hidden">
//                     <Image
//                         width={300}
//                         height={250}
//                         src={medicine.thumbnail || "/hero-image.png"}
//                         alt={medicine.name}
//                         className="h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
//                     />
//                 </div>
//                 {!hasStock && (
//                     <Badge variant="destructive" className="absolute top-2 right-2">
//                         Out of Stock
//                     </Badge>
//                 )}
//             </CardHeader>

//             {/* Product Details */}
//             <CardContent className="pt-0 pl-2 space-y-2">
//                 <div className="space-y-1">
//                     <h3 className="font-bold text-lg text-slate-800 line-clamp-1 group-hover:text-green-600 transition-colors">
//                         {medicine.name}
//                     </h3>
//                     <div className="flex items-center text-xs text-slate-500 gap-1">
//                         <Pill className="h-3 w-3" />
//                         <span className="line-clamp-1">{medicine.genericName}</span>
//                     </div>
//                     <div className="flex items-center text-xs text-slate-400 gap-1">
//                         <Factory className="h-3 w-3" />
//                         <span>{medicine.manufacturer || "N/A"}</span>
//                     </div>
//                 </div>

//                 <div className="pt-0">
//                     <span className="text-xl font-bold text-slate-900">
//                         ৳{seller?.price || "0"}
//                     </span>
//                 </div>
//             </CardContent>

//             {/* Actions */}
//             <CardFooter className="p-2 pt-0 grid grid-cols-5 gap-2">
//                 <Button
//                     variant="outline"
//                     asChild
//                     className="col-span-2 border-slate-200 hover:bg-slate-50 hover:text-green-600"
//                 >
//                     <Link href={`/medicine/${medicine.id}`}>
//                         <Eye className="h-4 w-4 mr-2" />
//                         View
//                     </Link>
//                 </Button>

//                 <Button
//                     className="col-span-3 bg-green-600 hover:bg-green-700 shadow-sm transition-all active:scale-95"
//                     onClick={handleAddToCart}
//                     disabled={loading || !hasStock}
//                 >
//                     {loading ? (
//                         <Loader2 className="h-4 w-4 animate-spin" />
//                     ) : (
//                         <>
//                             <ShoppingCart className="h-4 w-4 mr-2" />
//                             Add
//                         </>
//                     )}
//                 </Button>
//             </CardFooter>
//         </Card>
//     );
// }

// 'use client';

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Medicine } from "@/types/medicine";
// import { addToCart } from "@/actions/cart.action";
// import { toast } from "sonner";

// // Shadcn UI Components
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// // Lucide Icons
// import { ShoppingCart, Eye, Pill, Factory, Loader2 } from "lucide-react";

// interface MedicineCardProps {
//     medicine: Medicine;
// }

// export function MedicineCard({ medicine }: MedicineCardProps) {
//     const [loading, setLoading] = useState(false);
//     const seller = medicine.sellers?.[0];
//     const hasStock = seller && seller.stockQuantity > 0;

//     const handleAddToCart = async () => {
//         if (!hasStock) {
//             return toast.error("Out of stock");
//         }

//         setLoading(true);
//         const res = await addToCart(seller.id, 1);
//         setLoading(false);

//         if (!res.success) {
//             toast.warning("Please login to add to cart!");
//             return;
//         }

//         toast.success(res.message);
//     };

//     return (
//         <Card className="group overflow-hidden border-slate-200 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:border-green-400 bg-white rounded-2xl">
//             <CardHeader className="p-0 relative">
//                 <div className="h-44 w-full bg-slate-50/50 flex items-center justify-center overflow-hidden">
//                     <Image
//                         width={600}
//                         height={450}
//                         src={medicine.thumbnail || "/Kerfin7-NEA-2139.jpg"}
//                         alt={medicine.name}
//                         className="w-full h-full object-contain p-0 transition-transform duration-500 group-hover:scale-110"
//                     />
//                 </div>
//                 {!hasStock && (
//                     <Badge variant="destructive" className="absolute top-2 right-2 font-bold shadow-sm">
//                         Out of Stock
//                     </Badge>
//                 )}
//             </CardHeader>

//             {/* Product Details */}
//             <CardContent className="p-4 pt-3 space-y-2">
//                 <div className="space-y-1">
//                     <h3 className="font-bold text-base md:text-lg text-slate-800 line-clamp-1 group-hover:text-green-600 transition-colors">
//                         {medicine.name}
//                     </h3>
//                     <div className="flex items-center text-xs text-slate-500 gap-1.5 font-medium">
//                         <Pill className="h-3 w-3 text-green-500" />
//                         <span className="line-clamp-1">{medicine.genericName}</span>
//                     </div>
//                     <div className="flex items-center text-[11px] text-slate-400 gap-1.5">
//                         <Factory className="h-3 w-3" />
//                         <span className="line-clamp-1">{medicine.manufacturer || "N/A"}</span>
//                     </div>
//                 </div>

//                 <div className="flex items-baseline gap-1">
//                     <span className="text-xl font-black text-slate-900 leading-none">
//                         ৳{seller?.price || "0"}
//                     </span>
//                     <span className="text-[10px] text-slate-400 font-bold uppercase">/ piece</span>
//                 </div>
//             </CardContent>

//             {/* Actions */}
//             <CardFooter className="p-3 pt-0 grid grid-cols-5 gap-2">
//                 <Button
//                     variant="outline"
//                     asChild
//                     className="col-span-2 h-10 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-green-600 hover:border-green-200 transition-all"
//                 >
//                     <Link href={`/medicine/${medicine.id}`}>
//                         <Eye className="h-4 w-4 mr-1.5" />
//                         View
//                     </Link>
//                 </Button>

//                 <Button
//                     className="col-span-3 h-10 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold shadow-md shadow-green-100 transition-all active:scale-95 disabled:bg-slate-100"
//                     onClick={handleAddToCart}
//                     disabled={loading || !hasStock}
//                 >
//                     {loading ? (
//                         <Loader2 className="h-10 w-10 bg-green-500 animate-spin" />
//                     ) : (
//                         <div className="flex items-center">
//                             <ShoppingCart className="h-4 w-4 mr-1.5" />
//                             Add
//                         </div>
//                     )}
//                 </Button>
//             </CardFooter>
//         </Card>
//     );
// }

// 'use client';

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Medicine } from "@/types/medicine";
// import { addToCart } from "@/actions/cart.action";
// import { toast } from "sonner";

// // Shadcn UI Components
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// // Lucide Icons
// import { ShoppingCart, Eye, Pill, Factory, Loader2 } from "lucide-react";

// interface MedicineCardProps {
//     medicine: Medicine;
// }

// export function MedicineCard({ medicine }: MedicineCardProps) {
//     const [loading, setLoading] = useState(false);
//     const seller = medicine.sellers?.[0];
//     const hasStock = seller && seller.stockQuantity > 0;

//     const handleAddToCart = async () => {
//         if (!hasStock) {
//             return toast.error("Out of stock");
//         }

//         setLoading(true);
//         const res = await addToCart(seller.id, 1);
//         setLoading(false);

//         if (!res.success) {
//             toast.warning("Please login to add to cart!");
//             return;
//         }

//         toast.success(res.message);
//     };

//     return (
//         <Card className="group overflow-hidden rounded-2xl border-slate-200 bg-white transition-all duration-300 hover:border-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]">
//             {/* Image */}
//             <CardHeader className="p-0">
//                 <div className="relative rounded-2xl w-full aspect-[4/3] bg-slate-50 overflow-hidden">
//                     <Image
//                         fill
//                         src={medicine.thumbnail || "/Kerfin7-NEA-2139.jpg"}
//                         alt={medicine.name}
//                         className="object-contain  transition-transform duration-500 group-hover:scale-110"
//                     />
//                 </div>

//                 {!hasStock && (
//                     <Badge
//                         variant="destructive"
//                         className="absolute top-2 right-2 font-bold shadow-sm"
//                     >
//                         Out of Stock
//                     </Badge>
//                 )}
//             </CardHeader>

//             {/* Product Details */}
//             <CardContent className="p-4 pt-3 space-y-2">
//                 <div className="space-y-1">
//                     <h3 className="text-base md:text-lg font-bold text-slate-800 line-clamp-1 transition-colors group-hover:text-green-600">
//                         {medicine.name}
//                     </h3>

//                     <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
//                         <Pill className="h-3 w-3 text-green-500" />
//                         <span className="line-clamp-1">
//                             {medicine.genericName}
//                         </span>
//                     </div>

//                     <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
//                         <Factory className="h-3 w-3" />
//                         <span className="line-clamp-1">
//                             {medicine.manufacturer || "N/A"}
//                         </span>
//                     </div>
//                 </div>

//                 <div className="flex items-baseline gap-1">
//                     <span className="text-xl font-black leading-none text-slate-900">
//                         ৳{seller?.price || "0"}
//                     </span>
//                     <span className="text-[10px] font-bold uppercase text-slate-400">
//                         / piece
//                     </span>
//                 </div>
//             </CardContent>

//             {/* Actions */}
//             <CardFooter className="grid grid-cols-5 gap-2 p-3 pt-0">
//                 <Button
//                     variant="outline"
//                     asChild
//                     className="col-span-2 h-10 rounded-xl border-slate-200 text-slate-600 transition-all hover:border-green-200 hover:bg-slate-50 hover:text-green-600"
//                 >
//                     <Link href={`/medicine/${medicine.id}`}>
//                         <Eye className="mr-1.5 h-4 w-4" />
//                         View
//                     </Link>
//                 </Button>

//                 <Button
//                     className="col-span-3 h-10 rounded-xl bg-green-600 font-bold text-white shadow-md shadow-green-100 transition-all hover:bg-green-700 active:scale-95 disabled:bg-slate-100"
//                     onClick={handleAddToCart}
//                     disabled={loading || !hasStock}
//                 >
//                     {loading ? (
//                         <Loader2 className="h-4 w-4 animate-spin" />
//                     ) : (
//                         <div className="flex items-center">
//                             <ShoppingCart className="mr-1.5 h-4 w-4" />
//                             Add
//                         </div>
//                     )}
//                 </Button>
//             </CardFooter>
//         </Card>
//     );
// }


'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Medicine } from "@/types/medicine";
import { addToCart } from "@/actions/cart.action";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { ShoppingCart, Eye, Pill, Factory, Loader2 } from "lucide-react";

interface MedicineCardProps {
    medicine: Medicine;
}

export function MedicineCard({ medicine }: MedicineCardProps) {
    const [loading, setLoading] = useState(false);
    const seller = medicine.sellers?.[0];
    const hasStock = seller && seller.stockQuantity > 0;

    const handleAddToCart = async () => {
        if (!hasStock) return toast.error("Out of stock");

        setLoading(true);
        const res = await addToCart(seller.id, 1);
        setLoading(false);

        if (!res.success) {
            toast.warning("Please login to add to cart!");
            return;
        }

        toast.success(res.message);
    };

    return (
        <Card className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:border-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.18)]">

            {/* IMAGE – full bleed */}
            <CardHeader className="p-0 relative">
                <div className="relative w-full aspect-square overflow-hidden">
                    <Image
                        fill
                        src={medicine.thumbnail || "/Kerfin7-NEA-2139.jpg"}
                        alt={medicine.name}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                {!hasStock && (
                    <Badge className="absolute top-2 right-2 font-bold" variant="destructive">
                        Out of Stock
                    </Badge>
                )}
            </CardHeader>

            {/* CONTENT – gap reduced */}
            <CardContent className="px-4 pt-3 pb-2 space-y-1.5">
                <h3 className="text-base font-bold text-slate-800 line-clamp-1 group-hover:text-green-600">
                    {medicine.name}
                </h3>

                <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Pill className="h-3 w-3 text-green-500" />
                    <span className="line-clamp-1">{medicine.genericName}</span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Factory className="h-3 w-3" />
                    <span className="line-clamp-1">
                        {medicine.manufacturer || "N/A"}
                    </span>
                </div>

                <div className="pt-1 flex items-baseline gap-1">
                    <span className="text-xl font-black text-slate-900">
                        ৳{seller?.price || "0"}
                    </span>
                    <span className="text-[10px] uppercase text-slate-400 font-bold">
                        / piece
                    </span>
                </div>
            </CardContent>

            {/* ACTIONS */}
            <CardFooter className="grid grid-cols-5 gap-2 p-3 pt-1">
                <Button
                    variant="outline"
                    asChild
                    className="col-span-2 h-10 rounded-xl"
                >
                    <Link href={`/medicine/${medicine.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                    </Link>
                </Button>

                <Button
                    onClick={handleAddToCart}
                    disabled={loading || !hasStock}
                    className="col-span-3 h-10 rounded-xl bg-green-600 hover:bg-green-700 font-bold text-white active:scale-95"
                >
                    {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <>
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Add
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}
