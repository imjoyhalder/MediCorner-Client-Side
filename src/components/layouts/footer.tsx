
import Link from "next/link";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const Logo = () => {
    return (
        <Link href="#" className="flex items-center ">
            <Image
                width={200}
                height={200}
                src="/logo.png"
                className="size-8"
                alt="MediCorner logo"
            />
            <span className="text-2xl font-bold text-[#22c55e]">MediCorner</span>
        </Link>
    );
};

export default function FooterSection() {
    return (
        <footer className="py-12 bg-[#f8fafc] text-black">
            <div className="container mx-auto px-4 space-y-10">
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
                    {/* Logo & Description */}
                    <div className="space-y-4">
                        <Logo />
                        <p className="text-sm text-black/70">
                            Your trusted online medicine shop. Browse, order, and get medicines delivered to your door.
                        </p>
                    </div>

                    {/* Shop Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-black">Shop</h3>
                        <ul className="[&_li_a]:text-black [&_li_a]:hover:text-[#22c55e] space-y-2 [&_li_a]:block [&_li_a]:text-sm [&_li_a]:transition-colors [&_li_a]:hover:underline">
                            <li><Link href="/shop">All Medicines</Link></li>
                            <li><Link href="/shop?category=vitamins">Vitamins</Link></li>
                            <li><Link href="/shop?category=pain-relief">Pain Relief</Link></li>
                            <li><Link href="/shop?category=cough-cold">Cough & Cold</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-black">Company</h3>
                        <ul className="[&_li_a]:text-black [&_li_a]:hover:text-[#22c55e] space-y-2 [&_li_a]:block [&_li_a]:text-sm [&_li_a]:transition-colors [&_li_a]:hover:underline">
                            <li><Link className="text-lg" href="/about">About Us</Link></li>
                            <li><Link className="text-lg" href="/contact">Contact</Link></li>
                            <li><Link className="text-lg" href="/terms">Terms & Conditions</Link></li>
                            <li><Link className="text-lg" href="/privacy">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-black">Newsletter</h3>
                        <p className="text-lg text-black">
                            Get the latest updates on offers and new medicines.
                        </p>
                        <div className="flex space-x-2">
                            <InputGroup className="w-full">
                                <InputGroupInput
                                    type="email"
                                    placeholder="Your email"
                                    className="w-full"
                                />
                                <InputGroupAddon align="inline-end">
                                    <InputGroupButton
                                        className="bg-[#22c55e] text-white hover:bg-[#16a34a] transition px-4 py-2 rounded-md"
                                    >
                                        Subscribe
                                    </InputGroupButton>
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                    </div>
                </div>

                <Separator className="mt-10" />

                {/* Copyright */}
                <div className="text-center text-sm text-black/60 mt-2">
                    &copy; {new Date().getFullYear()} MediCorner. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
