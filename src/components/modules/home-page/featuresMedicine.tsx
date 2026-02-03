import { MedicineServices } from "@/services/medecine.service";
import { MedicineCard } from "@/components/modules/medicine/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Medicine } from "@/types/medicine";

export default async function FeaturedMedicines() {
    // এখানে আমরা লিমিটেড কিছু ডাটা ফেচ করবো (যেমন: প্রথম ৮টি)
    const res = await MedicineServices.getAllMedicine({ page: 1, limit: 8 });
    const medicines = res.data?.data || [];

    if (medicines.length === 0) return null;

    return (
        <section className="py-12 bg-transparent">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex items-end justify-between mb-8">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-green-600 font-bold text-xs uppercase tracking-widest">
                            <Sparkles size={14} />
                            Trending Now
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                            Featured <span className="text-green-600">Products</span>
                        </h2>
                    </div>

                    <Button variant="ghost" asChild className="text-slate-500 hover:text-green-600 font-bold">
                        <Link href="/medicine" className="flex items-center gap-2">
                            View All <ArrowRight size={16} />
                        </Link>
                    </Button>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {medicines.map((med: Medicine) => (
                        <MedicineCard key={med.id} medicine={med} />
                    ))}
                </div>
            </div>
        </section>
    );
}