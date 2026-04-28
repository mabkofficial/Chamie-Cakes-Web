"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { SITE_CONFIG } from "@/lib/config";

export default function HeroSectionFull({ 
  title = "Custom Cakes for Life's Sweetest Moments", 
  subtitle = SITE_CONFIG.description
}: { 
  title?: string; 
  subtitle?: string; 
}) {
  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png"
          alt="Luxury custom cake backdrop"
          fill
          className="object-cover opacity-50 scale-105"
          priority
        />
        {/* Focused left-to-right gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start space-y-6 text-left max-w-2xl pt-40 md:pt-48"
        >
          <Badge variant="outline" className="bg-white/5 border-white/20 text-white backdrop-blur-sm gap-2">
            <Star className="w-3 h-3 fill-white text-white" />
            Dallas' Premier Custom Studio
          </Badge>

          <Heading as="h1" size="h2" className="text-white">
            {title.replace('<br />', ' ')}
          </Heading>
          
          <p className="text-lg md:text-xl text-white/70 leading-relaxed font-body">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto">
            <Link 
              href="/order" 
              className="inline-flex items-center justify-center bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-200 transition-all active:scale-95 shadow-2xl"
            >
              Start My Order
            </Link>
            <Link 
              href="/gallery" 
              className="inline-flex items-center justify-center bg-transparent text-white border border-white/30 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 backdrop-blur-md transition-all active:scale-95"
            >
              View Gallery
            </Link>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
