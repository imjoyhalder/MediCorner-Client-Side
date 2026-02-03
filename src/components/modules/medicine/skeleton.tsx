// import { Skeleton } from "@/components/ui/skeleton";

// export function MedicineSkeleton() {
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//             {[...Array(6)].map((_, i) => (
//                 <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 space-y-4">
//                     <Skeleton className="h-48 w-full rounded-xl bg-slate-100" />
//                     <div className="space-y-2">
//                         <Skeleton className="h-4 w-3/4 bg-slate-100" />
//                         <Skeleton className="h-4 w-1/2 bg-slate-100" />
//                     </div>
//                     <div className="flex justify-between items-center pt-4">
//                         <Skeleton className="h-6 w-20 bg-slate-100" />
//                         <Skeleton className="h-10 w-24 rounded-full bg-slate-100" />
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }

import { Skeleton } from "@/components/ui/skeleton";

export function MedicineSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm space-y-5">
                    {/* Product Image Placeholder */}
                    <Skeleton className="h-52 w-full rounded-2xl bg-slate-100/80" />
                    
                    <div className="space-y-3">
                        {/* Brand/Generic Name */}
                        <Skeleton className="h-4 w-1/3 bg-slate-100/80 rounded-full" />
                        {/* Product Title */}
                        <Skeleton className="h-6 w-full bg-slate-100/80 rounded-full" />
                    </div>

                    <div className="flex justify-between items-center pt-2">
                        {/* Price */}
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-16 bg-slate-100/80 rounded-full" />
                        </div>
                        {/* Button */}
                        <Skeleton className="h-10 w-28 rounded-xl bg-slate-100/80" />
                    </div>
                </div>
            ))}
        </div>
    );
}