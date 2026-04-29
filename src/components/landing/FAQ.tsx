"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/layout/Section";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQData {
  title: string;
  subtitle: string;
  questions: FAQItem[];
}

const defaultFaqs: FAQItem[] = [
  {
    question: "How far in advance should I order?",
    answer: "We recommend booking at least 2-4 weeks in advance for standard custom cakes, and 3-6 months for wedding cakes. However, don't hesitate to check for last-minute availability!"
  },
  {
    question: "Do you offer delivery in DFW?",
    answer: "Yes! We offer delivery within the Dallas/Fort Worth area. Delivery fees depend on the distance from our studio. Pickup is also available by appointment."
  },
  {
    question: "Can you accommodate dietary restrictions?",
    answer: "We currently offer gluten-friendly and dairy-free options for many of our flavors. Please note that while we take precautions, our kitchen handles wheat, dairy, and nuts."
  },
  {
    question: "How do I get a price quote?",
    answer: "Pricing is based on design complexity, size, and flavor. Fill out our 'Start Your Order' form with your details, and we'll get back to you with a personalized quote within 24-48 hours."
  }
];

export default function FAQ({ data }: { data?: FAQData }) {
  const title = data?.title || "Need more details?";
  const subtitle = data?.subtitle || "Everything you need to know about the ordering process at Chamie Cakes. Still have questions? Reach out to us directly.";
  const faqs = data?.questions || defaultFaqs;
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <Section className="py-40 bg-white" containerClassName="max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-20">
        
        {/* Sidebar Info */}
        <div className="lg:w-1/3 space-y-8">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline">Questions</Badge>
            </motion.div>
            <Heading size="h2">
              {title.includes('<br') ? (
                <span dangerouslySetInnerHTML={{ __html: title }} />
              ) : title}
            </Heading>
          </div>
          
          <p className="text-slate-400 font-body leading-relaxed">
            {subtitle}
          </p>
          
          <div className="pt-4">
             <a href="/contact" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-black group">
                Contact Us
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
             </a>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="lg:w-2/3">
          <div className="border-t border-slate-100">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-slate-100 overflow-hidden">
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="w-full py-10 flex items-center justify-between text-left group"
                >
                  <span className={cn(
                    "text-xl md:text-2xl font-heading font-bold tracking-tight transition-all duration-500",
                    activeIndex === index ? "text-black translate-x-4" : "text-slate-400 group-hover:text-black"
                  )}>
                    {faq.question}
                  </span>
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                    activeIndex === index ? "bg-black text-white" : "bg-slate-50 text-slate-300 group-hover:bg-slate-100"
                  )}>
                    {activeIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="pl-4 md:pl-8 pb-10 pr-12">
                        <p className="text-slate-500 text-lg leading-relaxed font-body max-w-2xl">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Section>
  );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
