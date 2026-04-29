"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/layout/Section";

export default function AboutPreview({ 
  data,
  image = "/images/about-chamie.png" 
}: { 
  data?: { title: string, content: string },
  image?: string
}) {
  const content = data?.content || "Hi, I'm Chamie! I believe that every celebration deserves a centerpiece as unique and special as the person it's for.";
  const title = data?.title || "Made for your sweetest celebrations.";

  return (
    <Section className="py-32 bg-white overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        <motion.div 
          className="lg:w-1/2 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative aspect-square w-full max-w-lg mx-auto">
            <div className="relative h-full w-full rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={image}
                alt="Chamie Rochelle, Professional Cake Artist"
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Refined floating badge */}
          <div className="absolute -bottom-6 -left-6 bg-white p-8 rounded-xl shadow-2xl border border-slate-100 hidden md:flex items-center gap-6 max-w-[300px]">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-black fill-black" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-black leading-tight uppercase tracking-widest">Handmade with Love</p>
              <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">Fresh from our kitchen</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="lg:w-1/2 space-y-8"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-4">
            <Badge variant="outline">Meet the Baker</Badge>
            <Heading size="h2">{title}</Heading>
          </div>
          
          <div className="space-y-6 text-lg text-slate-500 leading-relaxed font-body">
            <p className="line-clamp-6">
              {content}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 pt-4">
            <Link 
              href="/our-story" 
              className="inline-flex items-center justify-center bg-black text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl hover:bg-slate-800 transition-all active:scale-95"
            >
              Read Our Story
            </Link>
            <Link 
              href="/gallery" 
              className="inline-flex items-center justify-center bg-white text-black border border-slate-200 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:border-black transition-all active:scale-95"
            >
              See My Work
            </Link>
          </div>
        </motion.div>

      </div>
    </Section>
  );
}
