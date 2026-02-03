
// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Pill } from 'lucide-react';

// interface HeroSectionMinimalProps {
//     title?: string;
//     description?: string;
// }

// const HeroSectionMinimal: React.FC<HeroSectionMinimalProps> = async ({
//     title = 'Your Trusted Online Medicine Shop',
//     description = 'Buy genuine OTC medicines from verified sellers. Fast delivery across Bangladesh.',
// }) => {
//     return (
//         <section className=" py-10 md:py-12 px-4">
//             <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
//                 <div className="text-center lg:text-left space-y-6">
//                     <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
//                         {title}
//                         <Pill className="inline ml-2 text-sky-500" size={48} />
//                     </h1>
//                     <p className="text-xl text-slate-700">{description}</p>
//                     <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                         <Link
//                             href="/shop"
//                             className="px-8 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
//                         >
//                             Shop Medicines
//                         </Link>
//                         <Link
//                             href="/register"
//                             className="px-8 py-3 border-2 border-green-500 text-green-500 font-semibold rounded-lg hover:bg-green-50 transition-colors"
//                         >
//                             Become a Seller
//                         </Link>
//                     </div>
//                 </div>
//                 <div className="relative">
//                     <Image
//                         src="/hero-image.png"
//                         alt="Medicine delivery illustration"
//                         width={500}
//                         height={350}
//                         className="mx-auto"
//                         priority
//                     />
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default HeroSectionMinimal;

// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Pill, ShieldCheck, Truck, Clock } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// interface HeroSectionProps {
//     title?: string;
//     description?: string;
// }

// const HeroSection: React.FC<HeroSectionProps> = ({
//     title = 'Your Trusted Online Medicine Shop',
//     description = 'Buy genuine OTC medicines from verified sellers. Fast delivery & Cash on Delivery available across Bangladesh.',
// }) => {
//     return (
//         <section className="relative overflow-hidden bg-transparent py-12 lg:py-20">
//             {/* Background Decorative Elements */}
//             <div className="absolute top-0 right-0 -z-10 h-72 w-72 bg-green-100/50 blur-3xl rounded-full" />
//             <div className="absolute bottom-0 left-0 -z-10 h-72 w-72 bg-blue-50/50 blur-3xl rounded-full" />

//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="grid lg:grid-cols-2 gap-12 items-center">

//                     {/* Left Content */}
//                     <div className="text-center lg:text-left space-y-8">
//                         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-green-100 shadow-sm">
//                             <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
//                             <span className="text-xs font-bold text-green-700 uppercase tracking-wider">
//                                 Welcome to MediStore 💊
//                             </span>
//                         </div>

//                         <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1]">
//                             {title.split(' ').slice(0, -1).join(' ')}{' '}
//                             <span className="text-green-600 italic">Shop</span>
//                         </h1>

//                         <p className="text-lg md:text-xl text-slate-600 font-medium max-w-xl mx-auto lg:mx-0">
//                             {description}
//                         </p>

//                         <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                             <Button asChild size="lg" className="h-14 px-8 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg shadow-green-200 transition-all active:scale-95">
//                                 <Link href="/medicine" className="flex items-center gap-2">
//                                     <Pill className="h-5 w-5" /> Shop Medicines
//                                 </Link>
//                             </Button>

//                             <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-2xl border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all active:scale-95">
//                                 <Link href="/register">Become a Seller</Link>
//                             </Button>
//                         </div>

//                         {/* Trust Badges */}
//                         <div className="pt-8 flex flex-wrap justify-center lg:justify-start gap-6 border-t border-slate-100">
//                             <div className="flex items-center gap-2 text-slate-500">
//                                 <ShieldCheck className="h-5 w-5 text-green-500" />
//                                 <span className="text-sm font-bold">Verified Sellers</span>
//                             </div>
//                             <div className="flex items-center gap-2 text-slate-500">
//                                 <Truck className="h-5 w-5 text-green-500" />
//                                 <span className="text-sm font-bold">Fast Delivery</span>
//                             </div>
//                             <div className="flex items-center gap-2 text-slate-500">
//                                 <Clock className="h-5 w-5 text-green-500" />
//                                 <span className="text-sm font-bold">24/7 Support</span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right Content: Illustration */}
//                     <div className="relative group">
//                         <div className="absolute inset-0 bg-green-200 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity" />
//                         <Image
//                             src="/hero-image.png"
//                             alt="MediStore Delivery"
//                             width={600}
//                             height={500}
//                             className="relative z-10 mx-auto transform transition-transform duration-700 group-hover:scale-105"
//                             priority
//                         />
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default HeroSection;

// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Pill, ShieldCheck, Truck, Clock, ArrowRight } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// interface HeroSectionProps {
//     title?: string;
//     description?: string;
// }

// const HeroSection: React.FC<HeroSectionProps> = ({
//     title = 'Your Trusted Online Medicine Shop',
//     description = 'Buy genuine OTC medicines from verified sellers. Fast delivery and Cash on Delivery available across Bangladesh.',
// }) => {
//     return (
//         <section className="relative overflow-hidden bg-transparent py-2 lg:py-24">
//             {/* Background Decorative Blur */}
//             <div className="absolute top-0 right-0 -z-10 h-80 w-80 bg-green-100/40 blur-[100px] rounded-full" />

//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="grid lg:grid-cols-2 gap-16 items-center">

//                     {/* Left Content */}
//                     <div className="text-center lg:text-left space-y-8">
//                         <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
//                             <span className="flex h-2 w-2 rounded-full bg-green-600" />
//                             <span className="text-[11px] font-bold text-slate-600 uppercase tracking-[0.2em]">
//                                 MediStore Platform
//                             </span>
//                         </div>

//                         <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
//                             {title.split(' ').slice(0, -1).join(' ')}{' '}
//                             <span className="text-green-600">Shop</span>
//                         </h1>

//                         <p className="text-lg md:text-xl text-slate-600 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
//                             {description}
//                         </p>

//                         <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                             <Button asChild size="lg" className="h-14 px-10 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg shadow-green-100 transition-all active:scale-95">
//                                 <Link href="/medicine" className="flex items-center gap-2">
//                                     Shop Medicines <ArrowRight className="h-4 w-4" />
//                                 </Link>
//                             </Button>

//                             <Button asChild variant="outline" size="lg" className="h-14 px-10 rounded-2xl border-slate-200 text-slate-800 font-bold hover:bg-slate-50 transition-all active:scale-95">
//                                 <Link href="/register">Become a Seller</Link>
//                             </Button>
//                         </div>

//                         {/* Feature Badges */}
//                         <div className="pt-10 flex flex-wrap justify-center lg:justify-start gap-8 border-t border-slate-100">
//                             <div className="flex items-center gap-2.5">
//                                 <div className="p-1 bg-green-50 rounded-lg">
//                                     <ShieldCheck className="h-5 w-5 text-green-600" />
//                                 </div>
//                                 <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Verified Sellers</span>
//                             </div>
//                             <div className="flex items-center gap-2.5">
//                                 <div className="p-1 bg-green-50 rounded-lg">
//                                     <Truck className="h-5 w-5 text-green-600" />
//                                 </div>
//                                 <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Express Delivery</span>
//                             </div>
//                             <div className="flex items-center gap-2.5">
//                                 <div className="p-1 bg-green-50 rounded-lg">
//                                     <Clock className="h-5 w-5 text-green-600" />
//                                 </div>
//                                 <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">24/7 Support</span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right Content */}
//                     <div className="relative">
//                         <div className="relative z-10 p-4">
//                             <Image
//                                 src="/hero-image.png"
//                                 alt="MediStore Healthcare"
//                                 width={600}
//                                 height={500}
//                                 className="mx-auto drop-shadow-2xl"
//                                 priority
//                             />
//                         </div>
//                         {/* Subtle background shape */}
//                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[120%] w-[120%] bg-green-50/50 rounded-full -z-10 blur-3xl" />
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default HeroSection;

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
    title?: string;
    description?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
    title = 'Your Trusted Online Medicine Shop',
    description = 'Buy genuine OTC medicines from verified sellers. Fast delivery across Bangladesh.',
}) => {
    return (
        <section className="py-8 md:py-12 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-8 items-center">

                    {/* Left: Text Content */}
                    <div className="space-y-6 text-center lg:text-left">
                        <div className="space-y-2">
                            <span className="text-green-600 font-bold text-xs uppercase tracking-[0.15em]">
                                Reliable Healthcare
                            </span>
                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                                {title}
                            </h1>
                            <p className="text-slate-600 text-base md:text-lg max-w-lg mx-auto lg:mx-0 font-medium">
                                {description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                            <Button asChild className="h-12 px-6 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold transition-all shadow-sm">
                                <Link href="/medicine" className="flex items-center gap-2">
                                    Shop Now <ArrowRight size={16} />
                                </Link>
                            </Button>

                            <Button asChild variant="outline" className="h-12 px-6 rounded-xl border-slate-200 text-slate-700 font-bold hover:bg-slate-50">
                                <Link href="/register">Sell Medicine</Link>
                            </Button>
                        </div>

                        {/* Minimal Trust Line */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-5 pt-2">
                            <div className="flex items-center gap-1.5 text-slate-400">
                                <ShieldCheck size={16} className="text-green-500" />
                                <span className="text-[11px] font-bold uppercase">Verified</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-400">
                                <Truck size={16} className="text-green-500" />
                                <span className="text-[11px] font-bold uppercase">Fast Delivery</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Illustration */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="w-full max-w-[450px]">
                            <Image
                                src="/hero-image.png"
                                alt="Healthcare Illustration"
                                width={450}
                                height={350}
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;