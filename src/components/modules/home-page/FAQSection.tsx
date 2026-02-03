import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "How do I order medicine from MediStore?",
        answer: "Ordering is simple! Search for your medicine, add it to your cart, and proceed to checkout. You can choose Cash on Delivery or digital payment methods.",
    },
    {
        question: "Are the medicines sold here genuine?",
        answer: "Absolutely. We only partner with verified pharmacy sellers and authorized distributors to ensure you receive 100% authentic products.",
    },
    {
        question: "How long does the delivery take?",
        answer: "For major cities, we typically deliver within 24-48 hours. For other areas across Bangladesh, it may take 3-5 business days.",
    },
    {
        question: "Can I return a medicine if it's wrong?",
        answer: "Yes, you can return products if the seal is intact and it's within our 7-day return policy. However, certain temperature-sensitive medicines may not be returnable.",
    },
];

export default function FAQSection() {
    return (
        <section className="py-1 bg-transparent">
            <div className="container mx-auto px-4 max-w-3xl">
                {/* Header */}
                <div className="text-center mb-10 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-[11px] font-bold uppercase tracking-wider border border-green-100">
                        <HelpCircle size={14} />
                        Support Center
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                        Commonly Asked <span className="text-green-600">Questions</span>
                    </h2>
                    <p className="text-slate-500 font-medium">
                        Everything you need to know about our service and products.
                    </p>
                </div>

                {/* Accordion Card */}
                <div className="bg-white p-2 md:p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-[0_8px_30px_rgba(34,197,94,0.05)] transition-all duration-500">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="border-b border-slate-50 last:border-0 px-4"
                            >
                                <AccordionTrigger className="text-left font-bold text-slate-700 hover:text-green-600 hover:no-underline py-4 tracking-tight transition-colors">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-500 font-medium leading-relaxed pb-4">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                {/* Minimal Support CTA */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-400 font-medium">
                        Still have questions? {" "}
                        <button className="text-green-600 font-bold hover:underline">
                            Contact our support team
                        </button>
                    </p>
                </div>
            </div>
        </section>
    );
}