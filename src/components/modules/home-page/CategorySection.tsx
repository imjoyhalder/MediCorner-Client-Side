
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { time } from "console"
import Link from "next/link"

interface Category {
    id: string
    name: string
    slug: string
}

export default async function CategorySection({ className }: { className?: string }) {
    // Next.js 14 app dir built-in fetch with cache: 'no-store' to always get latest
    const res = await fetch("https://medicorner-server.vercel.app/api/v1/categories", { cache: 'no-store' })
    const data = await res.json()
    const categories: Category[] = data?.categories || []

    console.log(data.data);

    // return (
    //     <section className={cn("py-8 px-4 md:px-16", className)}>
    //         <h2 className="text-3xl font-bold text-primary mb-6 text-center">
    //             Shop by Category
    //         </h2>

    //         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
    //             {categories.map((cat) => (
    //                 <Link
    //                     key={cat.id}
    //                     href={`/category/${cat.id}`} // click kore oi category medicines page e jabe
    //                     className="transition transform hover:scale-105"
    //                 >
    //                     <Card className="flex items-center justify-center p-4 text-center hover:shadow-lg hover:bg-primary/10">
    //                         <CardContent>
    //                             <span className="text-lg font-medium text-primary">
    //                                 {cat.name}
    //                             </span>
    //                         </CardContent>
    //                     </Card>
    //                 </Link>
    //             ))}
    //         </div>
    //     </section>
    // )
    return (
        <div className="bg-amber-400">
            <h1 className="text-xl text-center text-green-500">Medicine Category</h1>
            <h1>{JSON.stringify(data)}</h1>
        </div>
    )
}
