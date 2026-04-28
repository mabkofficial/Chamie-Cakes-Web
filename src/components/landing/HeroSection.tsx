"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export default function HeroSection({ 
  title = "Custom Cakes for Life's Sweetest Moments", 
  subtitle = "Handcrafted in Dallas/Fort Worth. Beautifully designed, uniquely flavored." 
}: { 
  title?: string; 
  subtitle?: string; 
}) {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png"
          alt="Beautiful custom tiered cake by Chamie Cakes"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Dark overlay for text readability - increased for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
        
        {/* Trust Badge / Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white shadow-lg"
        >
          <div className="flex text-[#D4AF37]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="text-sm font-medium tracking-wide">Dallas' Top Rated Custom Bakery</span>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 drop-shadow-lg leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          {title.split('<br />').map((text, i) => (
            <span key={i}>
              {text}
              {i < title.split('<br />').length - 1 && <br className="hidden md:block" />}
            </span>
          ))}
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-white/90 mb-10 font-sans tracking-wide drop-shadow max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {subtitle}
        </motion.p>
        

        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <Link 
            href="/order" 
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-[#D4AF37] hover:bg-[#b8952b] text-white rounded-full px-8 py-7 text-lg font-medium shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-105 h-auto"
            )}
          >
            Start Your Order
          </Link>
          <Link 
            href="/gallery" 
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-full px-8 py-7 text-lg font-medium transition-all duration-300 hover:scale-105 h-auto"
            )}
          >
            View Gallery
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
