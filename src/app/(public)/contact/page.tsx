import React from "react";
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    MessageSquare,
    Globe,
    HeadphonesIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactInfo = [
    {
        icon: <Phone className="h-5 w-5 text-green-600" />,
        title: "Call Us",
        details: "+880 1234 567 890",
        sub: "Mon-Fri from 9am to 6pm",
    },
    {
        icon: <Mail className="h-5 w-5 text-green-600" />,
        title: "Email Us",
        details: "support@medicorner.com",
        sub: "Online support 24/7",
    },
    {
        icon: <MapPin className="h-5 w-5 text-green-600" />,
        title: "Visit Us",
        details: "House 12, Road 5, Dhanmondi",
        sub: "Dhaka, Bangladesh",
    },
];

export default function ContactPage() {
    return (
        <div className="min-h-screen pb-20">
            {/* HEADER SECTION */}
            <section className="pt-20 pb-12 text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-green-200 text-green-700 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                    <HeadphonesIcon className="h-4 w-4" /> Get In Touch
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900  uppercase">
                    How can we <span className="text-green-600">help you?</span>
                </h1>
                <p className="max-w-xl mx-auto text-slate-600 font-medium">
                    Have questions about your order or need medical guidance? Our team is
                    ready to assist you. Reach out through any of these channels.
                </p>
            </section>

            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-3 gap-8 items-start">

                    {/* LEFT: Contact Cards */}
                    <div className="space-y-4">
                        {contactInfo.map((info, i) => (
                            <div key={i} className="bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-sm flex items-start gap-4 hover:shadow-md transition-all">
                                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                                    {info.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{info.title}</h4>
                                    <p className="text-slate-800 font-semibold text-sm">{info.details}</p>
                                    <p className="text-slate-500 text-xs mt-1">{info.sub}</p>
                                </div>
                            </div>
                        ))}

                        {/* Business Hours Card */}
                        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white space-y-4 relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <Clock className="h-5 w-5 text-green-400" />
                                    <h4 className="font-bold uppercase tracking-wider">Business Hours</h4>
                                </div>
                                <div className="space-y-2 text-sm text-slate-300">
                                    <div className="flex justify-between"><span>Saturday - Thursday</span> <span>09:00 - 21:00</span></div>
                                    <div className="flex justify-between border-t border-slate-800 pt-2"><span>Friday</span> <span>Emergency Only</span></div>
                                </div>
                            </div>
                            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-green-500/10 blur-3xl rounded-full" />
                        </div>
                    </div>

                    {/* RIGHT: Contact Form */}
                    <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-12 shadow-xl shadow-green-900/5">
                        <div className="mb-8">
                            <h2 className="text-2xl font-black text-slate-900  uppercase">Send us a Message</h2>
                            <p className="text-slate-500 text-sm mt-1">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
                        </div>

                        <form className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-slate-400 ml-1">Full Name</label>
                                <Input placeholder="John Doe" className="h-12 rounded-xl border-slate-200 focus:ring-green-500" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-slate-400 ml-1">Email Address</label>
                                <Input type="email" placeholder="john@example.com" className="h-12 rounded-xl border-slate-200" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs font-black uppercase text-slate-400 ml-1">Subject</label>
                                <Input placeholder="Order Inquiry" className="h-12 rounded-xl border-slate-200" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs font-black uppercase text-slate-400 ml-1">Message</label>
                                <Textarea placeholder="How can we help you today?" className="min-h-[150px] rounded-2xl border-slate-200" />
                            </div>
                            <div className="md:col-span-2 pt-2">
                                <Button className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-black uppercase rounded-2xl shadow-lg shadow-green-100 gap-2">
                                    <Send className="h-4 w-4" /> Send Message
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* MAP PLACEHOLDER / CTA */}
                {/* <section className="mt-20">
                    <div className="bg-white/40 backdrop-blur-sm border border-white p-4 rounded-[3rem]">
                        <div className="w-full h-96 bg-slate-200 rounded-[2.5rem] overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                                <div className="text-center space-y-2">
                                    <Globe className="h-12 w-12 text-slate-300 mx-auto animate-pulse" />
                                    <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Interactive Map Placeholder</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
            </div>
        </div>
    );
}