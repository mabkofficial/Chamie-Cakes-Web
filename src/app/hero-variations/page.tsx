"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Heart, MapPin, ChevronRight, Sparkles } from 'lucide-react';

// ==========================================
// THE MONOCHROME LUXURY COLLECTION
// ==========================================
// Focus: Clean Black & White aesthetic.
// High-end editorial feel without "cheap" colors.
// Normal typography scales (Max text-6xl).
// Fully rounded pill buttons.
// ==========================================

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

const PremiumBadge = ({ text }: { text: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600"
  >
    <Star className="w-3.5 h-3.5 fill-slate-400 text-slate-400" />
    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{text}</span>
  </motion.div>
);

// 1. THE REFINED SIGNATURE (B&W Edition)
function RefinedSignature() {
  return (
    <section className="relative w-full py-32 md:py-48 bg-white overflow-hidden border-b border-slate-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left z-10">
            <PremiumBadge text="Dallas' Premier Studio" />
            <motion.h1 
              className="text-5xl md:text-6xl font-heading text-black leading-[1.1] font-bold tracking-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Artisanal Cakes <br /> for Your Most <br /> <span className="text-slate-400">Precious</span> Moments.
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Bespoke cake designs handcrafted in Dallas. Experience the perfect harmony of spectacular design and high-quality organic ingredients.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
              {...fadeUp}
            >
              <Link href="#" className="bg-black text-white px-12 py-5 rounded-full font-bold text-lg shadow-xl hover:bg-slate-800 transition-all">Start My Order</Link>
              <Link href="#" className="inline-flex items-center justify-center bg-white text-black border border-slate-200 px-12 py-5 rounded-full font-bold text-lg hover:border-black transition-all">View Gallery</Link>
            </motion.div>
          </div>
          <div className="w-full lg:w-1/2 relative">
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="relative aspect-[4/5] w-full max-w-[500px] mx-auto lg:ml-auto rounded-[32px] overflow-hidden shadow-2xl border-[12px] border-white"
             >
               <Image src="/images/hero.png" alt="Hero" fill className="object-cover" priority />
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 2. THE MINIMALIST MONOLITH (B&W Edition)
function MinimalistMonolith() {
  return (
    <section className="relative w-full py-48 bg-[#FAFAFA] overflow-hidden border-b border-slate-100">
      <div className="container mx-auto px-4 text-center space-y-12">
        <PremiumBadge text="Bespoke Artistry" />
        <motion.h1 
          className="text-5xl md:text-7xl font-heading text-black leading-tight font-bold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Elevated Taste. <br /> Spectactular Design.
        </motion.h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-body leading-relaxed">
          From weddings to intimate gatherings, we create sculptural centerpieces that define your celebration. Scratch-baked with organic soul.
        </p>
        <div className="flex justify-center gap-6">
           <Link href="#" className="bg-black text-white px-16 py-5 rounded-full font-bold text-xl shadow-2xl hover:scale-105 transition-all">Begin Consultation</Link>
        </div>
        <div className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="relative aspect-square rounded-[32px] overflow-hidden shadow-lg"><Image src="/images/wedding.png" alt="Cake" fill className="object-cover" /></div>
           <div className="relative aspect-square rounded-[32px] overflow-hidden shadow-2xl scale-110 z-10 border-8 border-white"><Image src="/images/hero.png" alt="Cake" fill className="object-cover" /></div>
           <div className="relative aspect-square rounded-[32px] overflow-hidden shadow-lg"><Image src="/images/birthday.png" alt="Cake" fill className="object-cover" /></div>
        </div>
      </div>
    </section>
  );
}

// 3. THE ARCHITECTURAL SPLIT
function ArchitecturalSplit() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center bg-white border-b border-slate-100 overflow-hidden">
       <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-0 items-stretch">
          <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-12 pr-12 py-24 border-r border-slate-100">
             <div className="flex items-center gap-4 text-slate-300">
                <Sparkles className="w-6 h-6" />
                <div className="h-[1px] w-24 bg-slate-200" />
             </div>
             <h1 className="text-6xl md:text-8xl font-heading text-black font-bold leading-[0.9] tracking-tighter">Art you <br /> can <span className="italic text-slate-300">taste.</span></h1>
             <p className="text-xl text-slate-400 font-body leading-relaxed max-w-md">Bespoke cake designs that blend contemporary aesthetics with all-natural organic ingredients.</p>
             <div className="flex items-center gap-12 pt-4">
                <Link href="#" className="bg-black text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-slate-800 transition-all">Book Studio Date</Link>
                <Link href="#" className="font-bold text-black border-b border-black pb-1 hover:text-slate-400 hover:border-slate-400 transition-all">Our Process</Link>
             </div>
          </div>
          <div className="w-full lg:w-1/2 relative min-h-[60vh] lg:min-h-0 bg-slate-50">
             <Image src="/images/hero.png" alt="Hero" fill className="object-cover p-12 lg:p-24 scale-125 hover:scale-100 transition-transform duration-1000" />
          </div>
       </div>
    </section>
  );
}

export default function HeroVariations() {
  return (
    <main className="min-h-screen pt-20 bg-white">
      <div className="container mx-auto px-4 py-24 text-center border-b border-slate-100 bg-slate-50/50">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <h1 className="text-5xl font-heading font-bold text-black tracking-tight">The Monochrome Collection</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-body leading-relaxed">
             A refined, high-contrast selection of hero designs optimized for a premium Black & White boutique experience.
          </p>
          <div className="flex justify-center gap-12 pt-8">
             <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"><div className="w-1.5 h-1.5 rounded-full bg-black" /> Neutral Palette</div>
             <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"><div className="w-1.5 h-1.5 rounded-full bg-slate-200" /> Rounded UI</div>
          </div>
        </motion.div>
      </div>
      
      <div className="divide-y divide-slate-100">
        <RefinedSignature />
        <MinimalistMonolith />
        <ArchitecturalSplit />
      </div>

      <footer className="py-24 text-center bg-white border-t border-slate-100">
         <p className="text-slate-300 font-bold uppercase tracking-[0.3em] text-[10px]">End of Master Gallery</p>
         <Link href="/" className="inline-block mt-12 text-black font-bold text-lg border-b border-black pb-1 hover:text-slate-400 hover:border-slate-400 transition-all">Back to Home</Link>
      </footer>
    </main>
  );
}
