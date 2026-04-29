"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { SITE_CONFIG } from "@/lib/config";

export default function HeroSection({ 
  title = "Custom Cakes for Life's Sweetest Moments", 
  subtitle = SITE_CONFIG.description
}: { 
  title?: string; 
  subtitle?: string; 
}) {
  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center overflow-hidden bg-white">
      <div className="container mx-auto px-4 max-w-7xl pt-32">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="default" className="gap-2">
                <Star className="w-3 h-3 fill-slate-400 text-slate-400" />
                Custom Cakes in Dallas
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Heading as="h1" size="h2">
                {title.replace('<br />', ' ')}
              </Heading>
            </motion.div>
            
            <motion.p 
              className="text-lg md:text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {subtitle}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link 
                href="/order" 
                className="inline-flex items-center justify-center bg-black text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-black/10 hover:bg-slate-800 transition-all active:scale-95"
              >
                Start My Order
              </Link>
              <Link 
                href="/gallery" 
                className="inline-flex items-center justify-center bg-white text-black border-2 border-slate-100 px-10 py-4 rounded-full font-bold text-lg hover:border-black transition-all active:scale-95"
              >
                View Gallery
              </Link>
            </motion.div>
          </div>

          {/* Hero Image */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-[4/5] w-full max-w-[420px] mx-auto lg:ml-auto"
            >
              {/* Subtle Neutral Blurs */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-slate-200/50 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-slate-100/50 rounded-full blur-3xl" />
              
              <div className="relative h-full w-full rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero.png"
                  alt="Beautiful custom tiered cake by Chamie Cakes"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
