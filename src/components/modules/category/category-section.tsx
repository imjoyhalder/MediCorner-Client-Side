import Link from "next/link";
import {
    ChevronRight,
    LayoutGrid,
    Activity,
    Thermometer,
    Pill,
    HeartPulse,
    ShieldPlus,
    Stethoscope
} from "lucide-react";
import { Category } from "@/types/medicine";
import { CategoryServices } from "@/services/category.service";

const getDynamicIcon = (slug: string) => {
    const iconClass = "h-5 w-5 transition-transform duration-500 group-hover:scale-110";

    const iconMap: Record<string, React.ReactNode> = {
        'pain-relief': <HeartPulse className={`${iconClass} text-rose-500`} />,
        'first-aid': <ShieldPlus className={`${iconClass} text-blue-500`} />,
        'fever-inflammation': <Thermometer className={`${iconClass} text-orange-500`} />,
        'cold-and-flu': <Pill className={`${iconClass} text-teal-500`} />,
        'digestive-care': <Activity className={`${iconClass} text-emerald-500`} />,
    };

    return iconMap[slug] || <Stethoscope className={`${iconClass} text-green-600`} />;
};

export default async function CategorySection() {
    const res = await CategoryServices.getAllCategories();
    const categories = res.data || [];

    return (
        <section className="py-12 bg-transparent">
            <div className="container mx-auto">
                {/* Compact Header */}
                <div className="flex items-center justify-between mb-8 px-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-600 rounded-xl">
                            <LayoutGrid className="h-5 w-5 text-white" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                            Categories
                        </h2>
                    </div>

                    <Link
                        href="/medicine"
                        className="group flex items-center gap-1 text-[12px] font-bold text-green-600 hover:underline uppercase tracking-tighter"
                    >
                        See All <ChevronRight className="h-4 w-4" />
                    </Link>
                </div>

                {/* Small & Compact Grid with Hover Glow */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                    {categories.map((category: Category) => (
                        <Link
                            key={category.id}
                            href={`/medicine?categoryId=${category.id}&page=1`}
                            className="group flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:border-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] hover:-translate-y-1"
                        >
                            {/* Smaller Icon Box */}
                            <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-green-50 shrink-0 transition-colors duration-300">
                                {getDynamicIcon(category.slug)}
                            </div>

                            {/* Category Name */}
                            <h3 className="font-bold text-slate-700 group-hover:text-green-700 transition-colors text-xs md:text-sm line-clamp-1">
                                {category.name}
                            </h3>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {categories.length === 0 && (
                    <div className="text-center py-8 bg-white/50 rounded-2xl border border-dashed border-slate-200">
                        <p className="text-slate-400 text-sm font-medium">No categories found.</p>
                    </div>
                )}
            </div>
        </section>
    );
}