

// import Link from "next/link"
// import Image from "next/image"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Star } from "lucide-react"
// import { MedicineServices } from "@/services/medecine.service"

// const product = {
//     title: "White T-Shirt",
//     image: "/Kerfin7-NEA-2139.jpg",
//     price: "$29.00",
//     badge: "New Season",
//     rating: 4.5
// }

// export type Product = typeof product

// export default async function Page() {
//     const data = await MedicineServices.getAllMedicine()
//     console.log(data);
//     return (
//         <div className="mx-auto max-w-7xl py-10 px-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 <ProductCard product={product} />
//                 <ProductCard product={product} />
//                 <ProductCard product={product} />
//             </div>
//         </div>
//     )
// }

// const ProductCard = ({ product }: { product: Product }) => (
//     <Link
//         href="#"
//         className="group block rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-lg transition p-4"
//     >
//         {/* Product Image */}
//         <div className="relative aspect-square w-full overflow-hidden rounded-md">
//             <Image
//                 fill
//                 className="object-cover transition-transform duration-300 group-hover:scale-105"
//                 src={product.image}
//                 alt={product.title}
//             />
//             {product.badge && (
//                 <Badge
//                     variant="secondary"
//                     className="absolute top-2 end-2 bg-[#22c55e]/20 text-[#22c55e] font-semibold"
//                 >
//                     {product.badge}
//                 </Badge>
//             )}
//         </div>

//         {/* Product Info */}
//         <div className="mt-3 flex flex-col gap-1">
//             <p className="font-semibold text-[#0f172a]">{product.title}</p>
//             <p className="text-[#22c55e] font-bold">{product.price}</p>

//             {/* Rating */}
//             <div className="flex items-center gap-1">
//                 {Array.from({ length: 5 }).map((_, i) =>
//                     i < Math.floor(product.rating) ? (
//                         <Star key={i} className="w-4 h-4 fill-[#facc15] text-[#facc15]" />
//                     ) : (
//                         <Star key={i} className="w-4 h-4 text-gray-300" />
//                     )
//                 )}
//                 <span className="text-gray-500 text-xs ms-1">
//                     ({product.rating.toFixed(1)} out of 5)
//                 </span>
//             </div>

//             {/* Add to Cart Button */}
//             <Button
//                 variant="default"
//                 className="mt-3 w-full bg-[#22c55e] text-white hover:bg-green-600"
//             >
//                 Add to Cart
//             </Button>
//         </div>
//     </Link>
// )

// import Link from "next/link"
// import Image from "next/image"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Star, ShoppingCart } from "lucide-react"
// import { Medicine } from "@/types/medicine"

// export function MedicineCard({ medicine }: { medicine: Medicine }) {
//     const price = medicine.sellers[0]?.price ?? 0

//     return (
//         <Link
//             href={`/medicine/${medicine.id}`}
//             className="group rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md"
//         >
//             {/* Image */}
//             <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
//                 <Image
//                     fill
//                     src={medicine.thumbnail || "/Kerfin7-NEA-2139.jpg"}
//                     alt={medicine.name}
//                     className="object-cover transition-transform group-hover:scale-105"
//                 />

//                 {medicine.isOtc && (
//                     <Badge className="absolute left-2 top-2 bg-[#22c55e]/20 text-[#22c55e]">
//                         OTC
//                     </Badge>
//                 )}
//             </div>

//             {/* Info */}
//             <div className="mt-3 space-y-1">
//                 <h3 className="line-clamp-1 font-semibold text-[#0f172a]">
//                     {medicine.name}
//                 </h3>

//                 <p className="text-sm text-muted-foreground">
//                     {medicine.genericName}
//                 </p>

//                 <p className="font-bold text-[#22c55e]">৳ {price}</p>

//                 {/* Rating placeholder */}
//                 <div className="flex items-center gap-1">
//                     {Array.from({ length: 5 }).map((_, i) => (
//                         <Star
//                             key={i}
//                             className="h-4 w-4 text-gray-300"
//                         />
//                     ))}
//                 </div>

//                 <Button
//                     size="sm"
//                     className="mt-2 w-full bg-[#22c55e] hover:bg-green-600"
//                 >
//                     <ShoppingCart className="mr-2 h-4 w-4" />
//                     Add to Cart
//                 </Button>
//             </div>
//         </Link>
//     )
// }

// import Image from "next/image"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { ShoppingCart } from "lucide-react"
// import { Medicine } from "@/types/medicine"

// export function MedicineCard({ medicine }: { medicine: Medicine }) {
//     const price = medicine.sellers[0]?.price ?? 0

//     return (
//         <div className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition">
//             <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
//                 <Image
//                     fill
//                     src={medicine.thumbnail || "/Kerfin7-NEA-2139.jpg"}
//                     alt={medicine.name}
//                     className="object-cover"
//                 />
//                 {medicine.isOtc && (
//                     <Badge className="absolute top-2 left-2 bg-[#22c55e]/20 text-[#22c55e]">
//                         OTC
//                     </Badge>
//                 )}
//             </div>

//             <div className="mt-3 space-y-1">
//                 <h3 className="font-semibold text-[#0f172a] line-clamp-1">
//                     {medicine.name}
//                 </h3>
//                 <p className="text-sm text-muted-foreground">
//                     {medicine.genericName}
//                 </p>
//                 <p className="font-bold text-[#22c55e]">৳ {price}</p>

//                 <Button className="w-full mt-2 bg-[#22c55e] hover:bg-green-600">
//                     <ShoppingCart className="mr-2 h-4 w-4" />
//                     Add to Cart
//                 </Button>
//             </div>
//         </div>
//     )
// }

// "use client";

// import { Medicine } from "@/types/medicine";
// import { Button } from "@/components/ui/button";
// import { CartService } from "@/services/cart.service";
// import { toast } from "sonner"; // optional for notifications
// import { useState } from "react";
// import Image from "next/image";

// interface MedicineCardProps {
//     medicine: Medicine;
// }

// export function MedicineCard({ medicine }: MedicineCardProps) {
//     const [loading, setLoading] = useState(false);

//     const handleAddToCart = async () => {
//         if (!medicine.sellers.length) {
//             return toast.error("No stock available");
//         }

//         setLoading(true);

//         const sellerMedicineId = medicine.sellers[0].id; // ✅ correct ID

//         try {
//             const res = await fetch("http://localhost:5000/api/v1/cart/add", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     sellerMedicineId,
//                     quantity: 1,
//                 }),
//             });

//             const data = await res.json();

//             if (data.success) toast.success(data.message);
//             else toast.error(data.message);
//         } catch {
//             toast.error("Failed to add to cart");
//         } finally {
//             setLoading(false);
//         }
//     };


//     return (
//         <div className="bg-white rounded-xl border shadow-sm p-4 flex flex-col">
//             <div className="h-40 w-full bg-gray-100 flex items-center justify-center rounded-lg mb-4">
//                 {medicine.thumbnail ? (
//                     <Image width={300} height={250} src={medicine.thumbnail} alt={medicine.name} className="h-full object-contain" />
//                 ) : (
//                     <Image width={300} height={250} src={'/herb-capsule-infographic.png'} alt={medicine.name} className="h-full object-contain" />
//                 )}
//             </div>
//             <h3 className="text-lg font-semibold text-primary">{medicine.brandName}</h3>
//             <p className="text-gray-700 text-sm mb-2">{medicine.genericName}</p>
//             <p className="text-gray-500 text-sm mb-2">Manufacturer: {medicine.manufacturer || "N/A"}</p>
//             <p className="text-gray-900 font-semibold mb-4">৳{medicine.sellers[0]?.price || "0"}</p>
//             <Button
//                 className="bg-primary hover:bg-green-600"
//                 onClick={handleAddToCart}
//                 disabled={loading}
//             >
//                 {loading ? "Adding..." : "Add to Cart"}
//             </Button>
//         </div>
//     );
// }


"use client";

import { Medicine } from "@/types/medicine";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";
import { addToCart } from "@/services/cart.service";


interface MedicineCardProps {
    medicine: Medicine;
}

export function MedicineCard({ medicine }: MedicineCardProps) {
    const [loading, setLoading] = useState(false);

    const handleAddToCart = async () => {

        if (!medicine.sellers.length) {
            return toast.error("No stock available");
        }

        console.log(medicine);

        setLoading(true);

        const sellerMedicineId = medicine.sellers[0].id;

        const res = await addToCart(sellerMedicineId, 1);

        setLoading(false);

        if (!res.success) {
            toast.warning('Please login for add to cart!');  
            return;
        }


        if (res.success) toast.success(res.message);
        else toast.error(res.message);
    };

    return (
        <div className="bg-white rounded-xl border shadow-sm p-4 flex flex-col">
            <div className="h-40 w-full bg-gray-100 flex items-center justify-center rounded-lg mb-4">
                <Image
                    width={300}
                    height={250}
                    src={medicine.thumbnail || "/herb-capsule-infographic.png"}
                    alt={medicine.name}
                    className="h-full object-contain"
                />
            </div>

            <h3 className="text-lg font-semibold text-primary">
                {medicine.brandName}
            </h3>
            <p className="text-gray-700 text-sm mb-2">
                {medicine.genericName}
            </p>
            <p className="text-gray-500 text-sm mb-2">
                Manufacturer: {medicine.manufacturer || "N/A"}
            </p>
            <p className="text-gray-900 font-semibold mb-4">
                ৳{medicine.sellers[0]?.price || "0"}
            </p>

            <Button
                className="bg-green-500 hover:bg-green-600"
                onClick={handleAddToCart}
                disabled={loading}
            >
                {loading ? "Adding..." : "Add to Cart"}
            </Button>
        </div>
    );
}
