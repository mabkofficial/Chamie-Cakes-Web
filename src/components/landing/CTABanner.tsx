"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/layout/Section";
import { SITE_CONFIG } from "@/lib/config";

export default function CTABanner({ phone = SITE_CONFIG.contact.phone }: { phone?: string }) {
  return (
    <Section aria-labelledby="cta-heading" maxWidth="6xl" className="pb-32">
      <motion.div 
        className="bg-black text-white rounded-xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Decorative Element */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center"
            >
              <Badge variant="outline" className="border-white/10 text-white/30 font-medium px-4 py-0.5 rounded-full text-[8px] uppercase tracking-[0.2em]">
                Ready to start?
              </Badge>
            </motion.div>
            
            <Heading id="cta-heading" size="h2" align="center" className="text-white tracking-tight">
              Let's bake something special together.
            </Heading>
            
            <p className="text-white/40 text-sm md:text-base max-w-lg mx-auto font-body leading-relaxed">
              Whether it's a wedding, a birthday, or just because—we're here to make your celebration unforgettable.
            </p>
          </div>
          
          <div className="pt-4">
            <Link 
              href="/order" 
              className="inline-flex items-center gap-6 bg-white text-black px-14 py-6 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-2xl active:scale-95 group"
            >
              Inquire Now
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                 {[...Array(5)].map((_, i) => <Star key={i} className="w-2 h-2 text-white fill-white" />)}
              </div>
              <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/30">5-Star Rated in DFW</span>
            </div>
            <a href={`tel:${phone.replace(/\./g, '')}`} className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors">
              {phone}
            </a>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
