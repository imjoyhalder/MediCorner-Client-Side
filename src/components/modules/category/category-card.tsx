// import Link from "next/link";
// import { Category } from "@/types/medicine";
// import { ChevronRight } from "lucide-react";

// export const CategoryCard = ({ category }: { category: Category }) => {
//     return (
//         <Link
//             href={`/medicine?categoryId=${category.id}`}
//             className="group flex flex-col items-center p-6 bg-white rounded-2xl border border-slate-100 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:border-green-200 hover:-translate-y-1"
//         >
//             <div className="h-16 w-16 mb-4 rounded-full bg-green-50 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-500">
//                 {/* আপনি যদি আইকন স্ট্রিং হিসেবে পান তবে এখানে লজিক দিতে পারেন, নয়তো generic icon */}
//                 <span className="text-2xl font-bold uppercase">{category.name[0]}</span>
//             </div>
//             <h3 className="font-bold text-slate-800 group-hover:text-green-600 transition-colors">
//                 {category.name}
//             </h3>
//             <div className="mt-2 flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
//                 Browse <ChevronRight className="h-3 w-3 ml-1" />
//             </div>
//         </Link>
//     );
// };