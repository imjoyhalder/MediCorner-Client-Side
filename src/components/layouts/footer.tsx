import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const Logo = () => {
    return (
        <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="MediCorner" width={80} height={80} priority />
            <div className="leading-tight hidden md:block">
                <p className="text-2xl font-bold text-[#15a215] ">MediCorner</p>
            </div>
        </Link>
    );
};

export default function FooterSection() {
    return (
        <footer className="py-16 bg-white border-t border-slate-100 text-slate-900">
            <div className="container mx-auto px-4">
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Logo & Description */}
                    <div className="space-y-6">
                        <Logo />
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                            Your trusted digital pharmacy in Bangladesh. We provide 100% authentic medicines, healthcare products, and expert guidance delivered right to your doorstep.
                        </p>
                    </div>

                    {/* Quick Shop Links */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Shop</h3>
                        <ul className="space-y-3">
                            <li><Link href="/medicine" className="text-sm font-semibold text-slate-600 hover:text-[#22c55e] transition-colors">All Medicines</Link></li>
                            <li><Link href="/medicine?category=Vitamins" className="text-sm font-semibold text-slate-600 hover:text-[#22c55e] transition-colors">Vitamins & Supplements</Link></li>
                            <li><Link href="/medicine?category=Diabetes" className="text-sm font-semibold text-slate-600 hover:text-[#22c55e] transition-colors">Diabetes Care</Link></li>
                            <li><Link href="/medicine?category=Personal-Care" className="text-sm font-semibold text-slate-600 hover:text-[#22c55e] transition-colors">Personal Care</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Company</h3>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="text-sm font-semibold text-slate-600 hover:text-[#22c55e] transition-colors">About Our Story</Link></li>
                            <li><Link href="/contact" className="text-sm font-semibold text-slate-600 hover:text-[#22c55e] transition-colors">Contact Support</Link></li>
                            <li><Link href="/terms" className="text-sm font-semibold text-slate-600 hover:text-[#22c55e] transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="text-sm font-semibold text-slate-600 hover:text-[#22c55e] transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Newsletter</h3>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                            Subscribe to get special offers, free giveaways, and health tips.
                        </p>
                        <div className="flex flex-col space-y-2">
                            <div className="relative flex items-center">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="rounded-xl border-slate-200 pr-12 focus-visible:ring-[#22c55e]"
                                />
                                <Button
                                    size="icon"
                                    className="absolute right-1 h-8 w-8 bg-[#22c55e] hover:bg-[#16a34a] rounded-lg"
                                >
                                    <Send className="h-4 w-4 text-white" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="my-12 bg-slate-100" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-400 font-bold tracking-tight">
                        &copy; {new Date().getFullYear()} MEDI<span className="text-[#22c55e]">CORNER</span>. All rights reserved.
                    </p>

                    {/* Social/Payment Icons Placeholder */}
                    <div className="flex items-center gap-6">
                        <div className="flex gap-4">
                            <div className="h-6 w-10 bg-slate-50 rounded border border-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-300 uppercase">Visa</div>
                            <div className="h-6 w-10 bg-slate-50 rounded border border-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-300 uppercase">Bkash</div>
                            <div className="h-6 w-10 bg-slate-50 rounded border border-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-300 uppercase">Nagad</div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}