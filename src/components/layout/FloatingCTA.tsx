"use client";

import { useEffect, useState } from "react";
import { Phone, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/lib/config";
import Link from "next/link";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="md:hidden fixed bottom-6 left-0 right-0 px-6 z-40"
        >
          <div className="bg-black text-white shadow-2xl flex items-stretch rounded-3xl overflow-hidden border border-white/10 h-16">
            <a 
              href={`tel:${SITE_CONFIG.contact.phone.replace(/\./g, '')}`} 
              className="flex-1 flex items-center justify-center border-r border-white/10 active:bg-white/10 transition-colors"
            >
              <Phone className="w-5 h-5" />
            </a>
            <Link 
              href="/order"
              className="flex-[3] flex items-center justify-center gap-3 active:bg-white/10 transition-colors"
            >
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Start Your Order</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
