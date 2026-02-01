import Link from "next/link"
import { CategoryServices } from "@/services/category.service"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

export interface Category {
    id: string
    name: string
    slug: string
}

export default async function CategorySection() {
    const { data } = await CategoryServices.getAllCategories()
    // console.log(data)

    return (
        <section className="bg-[#f8fafc] py-12">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-[#22c55e] text-center mb-8">
                    Medicine Categories
                </h2>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {data?.data?.length ? (
                        data.data.map((category: Category) => (
                            <Link key={category.id} href={`/category/${category.id}`}>
                                <Card className="border border-gray-200 hover:shadow-lg transition-shadow hover:scale-105 cursor-pointer">
                                    <CardContent className="flex flex-col items-center justify-center p-6">
                                        {category.name}
                                    </CardContent>
                                </Card>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center text-muted-foreground">No categories found</p>
                    )}

                </div>
            </div>
        </section>
    )
}
