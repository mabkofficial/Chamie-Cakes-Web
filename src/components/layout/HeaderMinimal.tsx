"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Gallery", href: "/gallery" },
  { name: "Our Story", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function HeaderMinimal({ className }: { className?: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header 
        className={cn(`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-white border-b border-slate-100 py-4 shadow-sm" 
            : "bg-transparent py-10"
        }`, className)}
      >
        <div className="container mx-auto px-10 flex items-center justify-between max-w-7xl">
          <Link href="/" className="font-heading text-2xl font-bold tracking-tighter text-black">
            {SITE_CONFIG.name.toUpperCase()}
          </Link>

          <nav className="hidden md:flex items-center gap-12">
            {navLinks.map(link => (
               <Link key={link.href} href={link.href} className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/50 hover:text-black transition-colors">
                 {link.name}
               </Link>
            ))}
            <Link 
              href="/order" 
              className={`
                px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all
                ${isScrolled ? "bg-black text-white hover:bg-slate-800" : "bg-white text-black hover:bg-slate-100"}
              `}
            >
              Order
            </Link>
          </nav>

          <button 
            className="md:hidden text-black" 
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu logic stays the same but styled for this theme */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col items-center justify-center space-y-12"
          >
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-10 right-10">
              <X className="w-8 h-8" />
            </button>
            {navLinks.map(link => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)} 
                className="text-4xl font-heading font-bold uppercase tracking-tighter"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/order" 
              onClick={() => setMobileMenuOpen(false)}
              className="bg-black text-white px-12 py-5 rounded-full uppercase tracking-widest font-bold text-sm"
            >
              Start Order
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
