"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Gallery", href: "/gallery" },
  { name: "Our Story", href: "/our-story" },
  { name: "Contact", href: "/contact" },
];

export default function Header({ className }: { className?: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolled enough to change style
      setIsScrolled(currentScrollY > 20);

      // Determine visibility (Hide on scroll down, show on scroll up)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <motion.header 
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={cn("fixed top-0 left-0 right-0 z-50 flex flex-col", className)}
      >
        {/* Utility Top Bar */}
        <div className={cn(
          "bg-black border-b border-white/5 py-2 transition-all duration-500",
          isScrolled ? "h-0 py-0 opacity-0 overflow-hidden" : "h-auto opacity-100"
        )}>
          <div className="container mx-auto px-10 max-w-7xl flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-white/60">
            <div className="flex gap-6">
              <span className="flex items-center gap-2"><Phone className="w-3 h-3 text-white/40" /> {SITE_CONFIG.contact.phone}</span>
              <span className="hidden sm:inline">Dallas / Fort Worth Area</span>
            </div>
            <div className="flex gap-4">
               <a href={SITE_CONFIG.contact.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                 <InstagramIcon className="w-3.5 h-3.5" />
               </a>
               <a href={SITE_CONFIG.contact.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                 <FacebookIcon className="w-3.5 h-3.5" />
               </a>
            </div>
          </div>
        </div>
        
        <div className={cn(
          "transition-all duration-500",
          isScrolled 
            ? "bg-white/90 backdrop-blur-md py-4 shadow-xl" 
            : "bg-transparent py-6"
        )}>
          <div className="container mx-auto px-10 max-w-7xl flex justify-between items-center">
            <Link href="/" className="group flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold text-lg transition-transform group-hover:rotate-12">
                {SITE_CONFIG.name.charAt(0)}
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-black">
                {SITE_CONFIG.name}
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-12">
              {navLinks.map(link => (
                 <Link 
                  key={link.href} 
                  href={link.href} 
                  className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600 hover:text-black transition-colors"
                 >
                   {link.name}
                 </Link>
              ))}
              <Link 
                href="/order" 
                className="bg-black text-white px-10 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-black/10"
              >
                Order Your Cake
              </Link>
            </nav>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden w-10 h-10 flex items-center justify-center text-black" 
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[60] bg-white flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="font-heading text-2xl font-bold text-black">{SITE_CONFIG.name}</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-8 h-8 text-black" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-10">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-5xl font-bold text-black hover:italic transition-all font-heading uppercase tracking-tighter">
                  {link.name}
                </Link>
              ))}
              <Link href="/order" onClick={() => setMobileMenuOpen(false)} className="bg-black text-white py-6 rounded-full text-center font-bold uppercase tracking-widest text-sm shadow-2xl">
                Order Your Cake
              </Link>
            </nav>
            
            <div className="mt-auto pt-10 border-t border-slate-100 flex flex-col gap-4">
               <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-300">Get in Touch</p>
               <a href={`tel:${SITE_CONFIG.contact.phone}`} className="text-xl font-heading font-bold">{SITE_CONFIG.contact.phone}</a>
                <div className="flex gap-6 mt-4">
                   <a href={SITE_CONFIG.contact.instagram} className="flex items-center gap-2 text-slate-400 hover:text-black transition-colors">
                     <InstagramIcon className="w-4 h-4" />
                     <span className="text-[10px] font-bold uppercase tracking-widest">Instagram</span>
                   </a>
                   <a href={SITE_CONFIG.contact.facebook} className="flex items-center gap-2 text-slate-400 hover:text-black transition-colors">
                     <FacebookIcon className="w-4 h-4" />
                     <span className="text-[10px] font-bold uppercase tracking-widest">Facebook</span>
                   </a>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
