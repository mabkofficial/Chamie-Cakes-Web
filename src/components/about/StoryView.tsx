"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Heart, Award, MapPin } from "lucide-react";
import CTABanner from "@/components/landing/CTABanner";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/layout/Section";
import { SITE_CONFIG } from "@/lib/config";

interface StoryData {
  title: string;
  bakerImage: string;
  body: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function StoryView({ data }: { data: StoryData }) {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Cinematic Hero */}
      <Section className="min-h-screen flex items-center pt-32 pb-24 bg-white text-black relative overflow-hidden">
        <motion.div 
          className="relative z-10 max-w-4xl space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5 }}
           >
             <Badge variant="outline" className="border-black/10 text-black/40">Established 2018</Badge>
           </motion.div>
           <Heading as="h1" size="h1" className="text-black tracking-tighter leading-none">
             Baking as a <br /> Sculptural Art.
           </Heading>
           <p className="text-xl md:text-2xl text-slate-400 font-body leading-relaxed max-w-2xl">
             We don't just bake cakes; we craft memories. Every creation is a unique intersection of architectural design and artisanal flavor.
           </p>
           
        </motion.div>
        
        {/* Decorative Floating Element */}
        <motion.div 
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 aspect-square bg-slate-50 rounded-full blur-[120px] -z-10"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </Section>

      {/* The Founder Section */}
      <Section className="py-40 bg-white" containerClassName="max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            className="relative aspect-[4/5] w-full rounded-xl overflow-hidden shadow-2xl border border-slate-100 group"
            {...fadeInUp}
          >
             <Image 
               src="/images/about-chamie.png" 
               alt="Chamie Rochelle" 
               fill 
               className="object-cover transition-transform duration-1000 group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
             <div className="absolute bottom-10 left-10 text-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] mb-2 opacity-60">Founder & Master Baker</p>
                <h3 className="text-2xl font-heading font-bold tracking-tight">Chamie Rochelle</h3>
             </div>
          </motion.div>

          <motion.div 
            className="space-y-10"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <motion.div className="space-y-4" variants={fadeInUp}>
              <Badge variant="outline" className="border-black/10 text-black/40">The Visionary</Badge>
              <Heading size="h2">The Story Behind <br /> the Batter.</Heading>
            </motion.div>
            
            <motion.div className="text-lg text-slate-500 font-body leading-relaxed space-y-6" variants={fadeInUp}>
              <p>
                Chamie Cakes started with a simple passion: creating edible art that tastes as good as it looks. What began in a home kitchen in Dallas has evolved into a premier custom cake studio serving the entire DFW metroplex.
              </p>
              <p>
                Founder Chamie Rochelle brings a background in sculptural art to the world of baking, treating every cake as a blank canvas for texture, color, and form.
              </p>
            </motion.div>

            <motion.div className="pt-6 grid grid-cols-2 gap-8" variants={fadeInUp}>
               <div className="space-y-2 group">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                    <Heart className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-widest pt-2">Handcrafted</h4>
                  <p className="text-xs text-slate-400 font-body">No shortcuts. Everything made from scratch with premium ingredients.</p>
               </div>
               <div className="space-y-2 group">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                    <Award className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-widest pt-2">Award Winning</h4>
                  <p className="text-xs text-slate-400 font-body">Voted 5-stars across DFW for innovation and reliability.</p>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* The Philosophy Grid */}
      <Section className="py-40 bg-slate-50" containerClassName="max-w-7xl">
        <motion.div 
          className="text-center mb-24 space-y-4"
          {...fadeInUp}
        >
          <Badge variant="outline" className="border-black/10 text-black/40">Our Core</Badge>
          <Heading align="center" size="h2">The Three Pillars</Heading>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {[
            { title: "Sculptural Design", desc: "We push the boundaries of cake structure, focusing on texture and modern aesthetics." },
            { title: "Artisanal Flavor", desc: "Our recipes are curated pairings that prioritize sophisticated, balanced taste profiles." },
            { title: "Bespoke Service", desc: "Every client experience is collaborative, from the first sketch to final delivery." },
          ].map((pillar, i) => (
            <motion.div 
              key={i} 
              className="p-12 bg-white rounded-xl border border-slate-100 hover:border-black transition-all duration-700 group hover:shadow-2xl hover:-translate-y-2"
              variants={fadeInUp}
            >
               <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-colors">
                  <Sparkles className="w-5 h-5" />
               </div>
               <h3 className="text-xl font-heading font-bold mb-4 tracking-tight group-hover:translate-x-1 transition-transform duration-500">{pillar.title}</h3>
               <p className="text-slate-500 font-body leading-relaxed text-sm">{pillar.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* The Studio Section */}
      <Section className="py-40 bg-white" containerClassName="max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          <motion.div 
            className="lg:w-1/2 space-y-10 order-2 lg:order-1"
            {...fadeInUp}
          >
             <div className="space-y-4">
                <Badge variant="outline" className="border-black/10 text-black/40">The Studio</Badge>
                <Heading size="h2">Our Creative Hub <br /> in Dallas-Fort Worth.</Heading>
             </div>
             <p className="text-lg text-slate-500 font-body leading-relaxed">
               Located in the heart of Texas, our studio is where the magic happens. While we don't have a retail storefront, our private workspace is where we obsess over every petal, every pearl, and every layer.
             </p>
             <div className="flex items-center gap-4 text-black group">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Serving Dallas, Fort Worth & Beyond</span>
             </div>
          </motion.div>
          <motion.div 
            className="lg:w-1/2 order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
             <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl border border-slate-100 group">
                <Image 
                  src="/images/hero.png" 
                  alt="Our Studio workspace" 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
             </div>
          </motion.div>
        </div>
      </Section>

      {/* Final Quote */}
      <Section className="py-40 bg-black text-white text-center">
         <motion.div 
           className="max-w-4xl mx-auto space-y-12 px-6"
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
         >
            <h2 className="text-3xl md:text-5xl font-heading font-bold italic tracking-tighter leading-tight">
              "A celebration without a cake is just a meeting. But a celebration with a Chamie Cake is an unforgettable event."
            </h2>
            <div className="w-20 h-px bg-white/20 mx-auto" />
            <Link href="/order" className="inline-flex items-center gap-4 text-white font-bold uppercase tracking-[0.3em] text-[10px] group">
              Start Your Journey With Us <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
         </motion.div>
      </Section>
      
      <CTABanner phone={SITE_CONFIG.contact.phone} />
    </main>
  );
}
