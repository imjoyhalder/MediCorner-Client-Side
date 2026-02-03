import React from "react";
import {
    ShieldCheck,
    Truck,
    HeartPulse,
    Target,
    Users2,
    Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const coreValues = [
    {
        icon: <ShieldCheck className="h-6 w-6 text-green-600" />,
        title: "100% Genuine",
        desc: "Every medicine is sourced directly from certified pharmaceutical companies.",
    },
    {
        icon: <Truck className="h-6 w-6 text-green-600" />,
        title: "Express Delivery",
        desc: "Life-saving medicines delivered within hours, not days.",
    },
    {
        icon: <HeartPulse className="h-6 w-6 text-green-600" />,
        title: "Patient First",
        desc: "24/7 support for prescription and healthcare guidance.",
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen ">
            {/* ---------- HERO ---------- */}
            <section className=" lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center text-center space-y-5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-green-200 text-green-700 text-xs font-bold uppercase">
                            <Stethoscope className="h-4 w-4" />
                            About MediCorner
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 uppercase leading-tight max-w-3xl">
                            Modernizing{" "}
                            <span className="text-green-600">Healthcare</span> Access
                        </h1>

                        <p className="max-w-xl text-slate-600 text-base font-medium leading-relaxed">
                            MediCorner is a digital-first healthcare platform making authentic
                            medicines accessible, affordable, and reliable across Bangladesh.
                        </p>

                        <Button
                            size="lg"
                            className="bg-green-600 hover:bg-green-700 rounded-xl px-8 h-12 font-bold text-white"
                            asChild
                        >
                            <Link href="/medicine">Explore Medicines</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* ---------- MISSION & VISION ---------- */}
            <section className="">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-6">
                        <div className="bg-white p-8 rounded-2xl border border-slate-100 space-y-3">
                            <div className="bg-green-600 w-10 h-10 rounded-xl flex items-center justify-center text-white">
                                <Target className="h-5 w-5" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 uppercase">
                                Our Mission
                            </h2>
                            <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                Bridging the gap between pharmaceutical manufacturers and
                                patients using technology and trust.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-slate-100 space-y-3">
                            <div className="bg-slate-900 w-10 h-10 rounded-xl flex items-center justify-center text-white">
                                <Users2 className="h-5 w-5" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 uppercase">
                                Our Vision
                            </h2>
                            <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                To be the most trusted digital healthcare ecosystem in the
                                region.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------- CORE VALUES ---------- */}
            <section className="mt-4">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10 space-y-2">
                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 uppercase">
                            Why Choose Us
                        </h2>
                        <div className="h-1 w-16 bg-green-500 mx-auto rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {coreValues.map((value, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-green-300 transition-all shadow-sm text-center"
                            >
                                <div className="mb-4 inline-flex p-3 bg-green-50 rounded-xl">
                                    {value.icon}
                                </div>
                                <h4 className="text-lg font-bold text-slate-800 mb-2">
                                    {value.title}
                                </h4>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                    {value.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- CTA ---------- */}
            <section className="py-10">
                <div className="container mx-auto px-4">
                    <div className="bg-slate-900 rounded-3xl p-10 md:p-14">
                        <div className="max-w-2xl space-y-4">
                            <h2 className="text-2xl md:text-4xl font-black text-white uppercase">
                                Download Our <span className="text-green-500">Mobile App</span>
                            </h2>
                            <p className="text-slate-400 text-sm font-medium">
                                Manage prescriptions, track orders, and get health alerts on the
                                go.
                            </p>
                            <div className="flex gap-3 pt-3">
                                <Button className="bg-white text-slate-900 rounded-lg font-bold h-11 px-6">
                                    App Store
                                </Button>
                                <Button className="bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold h-11 px-6">
                                    Google Play
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
