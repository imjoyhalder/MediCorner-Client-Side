
import React from "react"
import Image from "next/image"
import Link from "next/link"

const HeroSection = () => {
    return (
        <section className="bg-gradient-to-r from-green-100 to-green-50 py-16 md:py-24">
            <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-4 md:px-0 gap-10">

                {/* Left Side: Text + CTA */}
                <div className="flex-1 text-center md:text-left space-y-6">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-900">
                        Your Trusted Online Medicine Shop 💊
                    </h1>
                    <p className="text-gray-700 text-base sm:text-lg md:text-xl">
                        Buy genuine OTC medicines from verified sellers. Fast delivery & Cash on Delivery available across Bangladesh.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-4">
                        <Link href="/shop">
                            <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
                                Shop Medicines
                            </button>
                        </Link>

                        <Link href="/register">
                            <button className="px-6 py-3 bg-white text-green-600 border border-green-600 rounded-lg font-semibold hover:bg-green-50 transition">
                                Become a Seller
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Right Side: Illustration */}
                <div className="flex-1">
                    <Image
                        src="/hero-image.png"
                        alt="Medicines Illustration"
                        width={500}
                        height={400}
                        className="mx-auto"
                    />
                </div>

            </div>
        </section>
    )
}

export default HeroSection
