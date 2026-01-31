// import Link from "next/link";
// import Image from "next/image";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Star } from "lucide-react";

// const product = {
//     title: "White T-Shirt",
//     image: "/Kerfin7-NEA-2139.jpg",
//     price: "$29.00",
//     badge: "New Season",
//     rating: 4
// };

// export type Product = typeof product;

// export default function Page() {
//     return (
//         <div className="mx-auto max-w-80 py-10">
//             <Product product={product} />
//         </div>
//     );
// }

// const Product = ({ product }: { product: Product }) => (
//     <Link href="#" className="group">
//         <figure className="relative aspect-square w-full overflow-hidden rounded-md object-cover">
//             <Image
//                 fill
//                 className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2"
//                 src={product.image}
//                 alt={product.title}
//             />
//             <Badge variant="secondary" className="absolute end-2 top-2 bg-white/30 dark:bg-black/30">
//                 {product.badge}
//             </Badge>
//         </figure>
//         <div className="mt-3 space-y-2">
//             <div className="flex items-center justify-between gap-1">
//                 <p className="font-medium">{product.title}</p>
//                 <p className="text-muted-foreground">{product.price}</p>
//             </div>
//             <div className="flex items-center gap-1">
//                 {Array(5)
//                     .fill("")
//                     .map((_, i) =>
//                         i < product.rating ? (
//                             <Star key={i} className="size-4 fill-amber-500 text-amber-500" />
//                         ) : (
//                             <Star key={i} className="text-muted-foreground size-4" />
//                         )
//                     )}
//                 <span className="text-muted-foreground ms-1 text-xs">(4.5 out of 5)</span>
//             </div>
//         </div>
//         <Button variant="secondary" className="mt-4 w-full">
//             Add to Cart
//         </Button>
//     </Link>
// );


import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

const product = {
    title: "White T-Shirt",
    image: "/Kerfin7-NEA-2139.jpg",
    price: "$29.00",
    badge: "New Season",
    rating: 4.5
}

export type Product = typeof product

export default function Page() {
    return (
        <div className="mx-auto max-w-7xl py-10 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <ProductCard product={product} />
                <ProductCard product={product} />
                <ProductCard product={product} />
            </div>
        </div>
    )
}

const ProductCard = ({ product }: { product: Product }) => (
    <Link
        href="#"
        className="group block rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-lg transition p-4"
    >
        {/* Product Image */}
        <div className="relative aspect-square w-full overflow-hidden rounded-md">
            <Image
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                src={product.image}
                alt={product.title}
            />
            {product.badge && (
                <Badge
                    variant="secondary"
                    className="absolute top-2 end-2 bg-[#22c55e]/20 text-[#22c55e] font-semibold"
                >
                    {product.badge}
                </Badge>
            )}
        </div>

        {/* Product Info */}
        <div className="mt-3 flex flex-col gap-1">
            <p className="font-semibold text-[#0f172a]">{product.title}</p>
            <p className="text-[#22c55e] font-bold">{product.price}</p>

            {/* Rating */}
            <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) =>
                    i < Math.floor(product.rating) ? (
                        <Star key={i} className="w-4 h-4 fill-[#facc15] text-[#facc15]" />
                    ) : (
                        <Star key={i} className="w-4 h-4 text-gray-300" />
                    )
                )}
                <span className="text-gray-500 text-xs ms-1">
                    ({product.rating.toFixed(1)} out of 5)
                </span>
            </div>

            {/* Add to Cart Button */}
            <Button
                variant="default"
                className="mt-3 w-full bg-[#22c55e] text-white hover:bg-green-600"
            >
                Add to Cart
            </Button>
        </div>
    </Link>
)

