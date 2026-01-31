
// import React from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { Pill } from "lucide-react"

// const HeroSection = () => {
//     return (
//         <section className="bg-gradient-to-r from-green-100 to-green-50 py-14 md:py-18">
//             <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-4 md:px-0 gap-10">

//                 {/* Left Side: Text + CTA */}
//                 <div className="flex-1 text-center md:text-left space-y-6">
//                     <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-900">
//                         <span>Your Trusted Online Medicine Shop
//                             <span>
//                                 <Pill size={136} color="#070ee4" strokeWidth={0.75} />
//                             </span>
//                         </span>
//                     </h1>
//                     <p className="text-gray-700 text-base sm:text-lg md:text-xl">
//                         Buy genuine OTC medicines from verified sellers. Fast delivery & Cash on Delivery available across Bangladesh.
//                     </p>

//                     <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-4">
//                         <Link href="/shop">
//                             <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
//                                 Shop Medicines
//                             </button>
//                         </Link>

//                         <Link href="/register">
//                             <button className="px-6 py-3 bg-white text-green-600 border border-green-600 rounded-lg font-semibold hover:bg-green-50 transition">
//                                 Become a Seller
//                             </button>
//                         </Link>
//                     </div>
//                 </div>

//                 {/* Right Side: Illustration */}
//                 <div className="flex-1">
//                     <Image
//                         src="/hero-image.png"
//                         alt="Medicines Illustration"
//                         width={500}
//                         height={400}
//                         className="mx-auto"
//                     />
//                 </div>

//             </div>
//         </section>
//     )
// }

// export default HeroSection


// components/HeroSection.minimal.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pill } from 'lucide-react';

interface HeroSectionMinimalProps {
    title?: string;
    description?: string;
}

const HeroSectionMinimal: React.FC<HeroSectionMinimalProps> = async ({
    title = 'Your Trusted Online Medicine Shop',
    description = 'Buy genuine OTC medicines from verified sellers. Fast delivery across Bangladesh.',
}) => {
    return (
        <section className=" py-12 md:py-18 px-4">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                        {title}
                        <Pill className="inline ml-2 text-sky-500" size={48} />
                    </h1>
                    <p className="text-xl text-slate-700">{description}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link
                            href="/shop"
                            className="px-8 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Shop Medicines
                        </Link>
                        <Link
                            href="/register"
                            className="px-8 py-3 border-2 border-green-500 text-green-500 font-semibold rounded-lg hover:bg-green-50 transition-colors"
                        >
                            Become a Seller
                        </Link>
                    </div>
                </div>
                <div className="relative">
                    <Image
                        src="/hero-image.png"
                        alt="Medicine delivery illustration"
                        width={500}
                        height={350}
                        className="mx-auto"
                        priority
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSectionMinimal;