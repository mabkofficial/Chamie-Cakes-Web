"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

export default function HeaderHidden({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className={cn("fixed top-0 left-0 right-0 z-50 p-10 flex justify-between items-center pointer-events-none", className)}>
        <Link href="/" className="pointer-events-auto font-heading text-xl font-bold tracking-tighter text-black mix-blend-difference invert">
          {SITE_CONFIG.name}
        </Link>
        
        <button 
          onClick={() => setOpen(true)}
          className="pointer-events-auto flex items-center gap-4 text-white group"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-opacity">Menu</span>
          <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
            <Menu className="w-5 h-5 text-white" />
          </div>
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black text-white flex flex-col p-20"
          >
             <div className="flex justify-between items-center">
                <span className="font-heading text-2xl font-bold">{SITE_CONFIG.name}</span>
                <button onClick={() => setOpen(false)} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <X className="w-6 h-6" />
                </button>
             </div>
             
             <nav className="mt-auto mb-auto flex flex-col gap-8">
                {["Gallery", "Our Story", "Contact", "Order"].map((item, i) => (
                  <Link 
                    key={item} 
                    href={`/${item.toLowerCase().replace(' ', '')}`}
                    onClick={() => setOpen(false)}
                    className="text-6xl md:text-8xl font-heading font-bold hover:italic transition-all"
                  >
                    {item}
                  </Link>
                ))}
             </nav>
             
             <div className="flex justify-between items-end border-t border-white/10 pt-10">
                <p className="text-white/40 text-sm max-w-xs">{SITE_CONFIG.description}</p>
                <div className="text-right">
                   <p className="text-[10px] font-bold uppercase tracking-widest mb-2">Dallas, TX</p>
                   <p className="text-xl font-heading">{SITE_CONFIG.contact.phone}</p>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
