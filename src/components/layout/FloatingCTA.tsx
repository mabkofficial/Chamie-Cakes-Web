"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero section (roughly 500px)
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
          transition={{ duration: 0.3 }}
          className="md:hidden fixed bottom-6 left-0 right-0 px-4 z-40"
        >
          <div className="bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-2 flex items-center justify-between border border-border/50">
            <div className="flex-1 px-4 text-center border-r border-border/50">
              <a href="tel:7132693696" className="flex flex-col items-center justify-center text-primary py-1">
                <Phone className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">Call Now</span>
              </a>
            </div>
            <div className="flex-[2] pl-2 pr-1">
              <button className="w-full bg-[#D4AF37] text-white py-3 rounded-full font-medium shadow-sm active:scale-95 transition-transform text-sm">
                Start Your Order
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
