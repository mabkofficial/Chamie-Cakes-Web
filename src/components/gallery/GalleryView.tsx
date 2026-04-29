"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Utensils, Calendar, MapPin, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/layout/Section";
import FilterableGrid from "@/components/gallery/FilterableGrid";
import CTABanner from "@/components/landing/CTABanner";
import { SITE_CONFIG } from "@/lib/config";

interface Cake {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

const processSteps = [
  { icon: <Calendar className="w-5 h-5" />, title: "Secure Your Date", desc: "Custom cakes require 2-4 weeks lead time. Book early to ensure availability." },
  { icon: <Utensils className="w-5 h-5" />, title: "Choose Your Flavor", desc: "Choose from our curated flavor pairings designed for everyone to enjoy." },
  { icon: <MapPin className="w-5 h-5" />, title: "Careful Delivery", desc: "We provide careful delivery across the Dallas-Fort Worth area." },
];

const flavors = [
  { 
    title: "Signature Velvet", 
    description: "Deep cocoa with a hint of espresso and vanilla bean cream.",
    notes: "Rich & Smooth",
    highlight: true
  },
  { 
    title: "Lemon Lavender", 
    description: "Zesty lemon cake with organic lavender and honey buttercream.",
    notes: "Fresh & Floral",
    highlight: false
  },
  { 
    title: "Salted Caramel", 
    description: "Rich buttery layers with house-made salted caramel and toasted pecans.",
    notes: "Sweet & Salty",
    highlight: false
  },
];

export default function GalleryView({ cakes }: { cakes: Cake[] }) {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <Section className="min-h-[60vh] flex items-center py-0 pt-32 pb-4 md:py-0 md:pt-32 md:pb-4">
        <div className="max-w-7xl w-full flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="max-w-2xl space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="outline" className="border-black/10 text-black/40">Our Work</Badge>
            </motion.div>
            
            <Heading as="h1" size="h1" className="tracking-tighter">
              Our Gallery.
            </Heading>
            
            <p className="text-lg md:text-xl text-slate-400 font-body leading-relaxed max-w-xl">
              Take a look at our custom cakes, where beautiful design meets great taste.
            </p>
          </div>

          <div className="pb-2">
             <div className="inline-flex items-center gap-4 px-6 py-3 bg-slate-50 border border-slate-100 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/60">{SITE_CONFIG.bookingStatus}</span>
             </div>
          </div>
        </div>
      </Section>

      {/* Gallery Section */}
      <Section className="py-0 pt-0 pb-32 md:py-0 md:pt-0 md:pb-32" containerClassName="max-w-7xl">
        <FilterableGrid initialCakes={cakes} />
      </Section>

      {/* The Process */}
      <Section className="py-40 bg-slate-50" containerClassName="max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <Badge variant="outline">How it works</Badge>
              <Heading size="h2" className="tracking-tight">
                From Vision <br /> to Celebration.
              </Heading>
            </div>
            <p className="text-lg text-slate-500 font-body leading-relaxed max-w-md">
              Ordering a custom cake is a fun process. We guide you through every step to make sure your cake is perfect for your event.
            </p>
            <div className="pt-4">
              <a href="/order" className="inline-flex items-center gap-4 text-black font-bold uppercase tracking-widest text-[10px] hover:gap-6 transition-all group">
                Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {processSteps.map((step, i) => (
              <div key={i} className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm flex gap-8 items-start group hover:border-black transition-all duration-500">
                 <div className="w-12 h-12 rounded-xl bg-slate-50 text-black border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-black group-hover:text-white transition-colors">
                    {step.icon}
                 </div>
                 <div>
                    <h4 className="text-lg font-bold text-black tracking-tight mb-2">{step.title}</h4>
                    <p className="text-sm text-slate-500 font-body leading-relaxed max-w-sm">{step.desc}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Flavors */}
      <Section className="py-40 bg-white" containerClassName="max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="space-y-4 max-w-xl text-left">
            <Badge variant="outline" className="border-black/10 text-black/40">Flavors</Badge>
            <Heading size="h2">Inside Our Cakes</Heading>
            <p className="text-slate-500 font-body text-lg">Delicious flavor pairings that everyone will enjoy.</p>
          </div>
          <div className="pb-2">
             <Link href="/order" className="flex items-center gap-4 text-black font-bold uppercase tracking-[0.2em] text-[10px] group">
                Full Menu Available on Request
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {flavors.map((flavor, i) => (
             <div 
               key={i} 
               className={`relative p-10 rounded-xl border transition-all duration-700 group flex flex-col h-full overflow-hidden ${
                 flavor.highlight 
                   ? "bg-black border-black text-white shadow-2xl" 
                   : "bg-white border-slate-100 hover:border-black text-black"
               }`}
             >
                {flavor.highlight && (
                   <div className="absolute top-0 right-0 p-6 opacity-20">
                     <Sparkles className="w-12 h-12" />
                   </div>
                )}
                
                <div className="space-y-6 flex-grow">
                  <div className="space-y-1">
                    <span className={`text-[8px] font-bold uppercase tracking-[0.3em] ${flavor.highlight ? "text-white/40" : "text-black/30"}`}>
                      {flavor.notes}
                    </span>
                    <h3 className={`text-2xl font-heading font-bold tracking-tight transition-all duration-500 group-hover:translate-x-1 ${flavor.highlight ? "text-white" : "text-black"}`}>
                      {flavor.title}
                    </h3>
                  </div>
                  
                  <p className={`font-body leading-relaxed text-sm ${flavor.highlight ? "text-white/70" : "text-slate-500"}`}>
                    {flavor.description}
                  </p>
                </div>

                <div className={`mt-10 pt-8 border-t flex items-center justify-between ${flavor.highlight ? "border-white/10" : "border-slate-50"}`}>
                   <span className={`text-[9px] font-bold uppercase tracking-widest ${flavor.highlight ? "text-white/50" : "text-black/40"}`}>
                     Signature Blend
                   </span>
                   <Utensils className={`w-4 h-4 ${flavor.highlight ? "text-white/20" : "text-slate-200"}`} />
                </div>
             </div>
           ))}
        </div>
      </Section>
      
      <CTABanner phone={SITE_CONFIG.contact.phone} />
    </main>
  );
}
