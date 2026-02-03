import { ShieldCheck, Truck, Clock, CheckCircle2 } from "lucide-react";

const features = [
    {
        icon: <ShieldCheck className="h-6 w-6" />,
        title: "100% Genuine",
        description: "Medicines sourced only from verified sellers and top brands."
    },
    {
        icon: <Truck className="h-6 w-6" />,
        title: "Fast Delivery",
        description: "Quick and safe delivery to your doorstep across Bangladesh."
    },
    {
        icon: <Clock className="h-6 w-6" />,
        title: "24/7 Support",
        description: "Our dedicated pharmacists are here to help you anytime."
    },
    {
        icon: <CheckCircle2 className="h-6 w-6" />,
        title: "Cash on Delivery",
        description: "Easy payment on delivery. Safe and secure transactions."
    }
];

export default function TrustSection() {
    return (
        <section className="py-16 bg-transparent">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative bg-white p-6 rounded-[2rem] border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(34,197,94,0.1)] hover:border-green-200 hover:-translate-y-1"
                        >
                            {/* Icon Box */}
                            <div className="mb-4 inline-flex p-4 bg-slate-50 rounded-2xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-500 shadow-sm">
                                {feature.icon}
                            </div>

                            {/* Text Content */}
                            <div className="space-y-2">
                                <h3 className="text-lg font-black text-slate-800 tracking-tight group-hover:text-green-700 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Background Subtle Accent */}
                            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                {feature.icon}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}