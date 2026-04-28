"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-4 border-b border-border/40" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className={`font-heading font-bold text-2xl tracking-wide ${isScrolled ? "text-foreground" : "text-white drop-shadow-md"}`}>
            CHAMIE CAKES
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-foreground/80" : "text-white/90"}`}>Home</Link>
            <Link href="/gallery" className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-foreground/80" : "text-white/90"}`}>Gallery</Link>
            <Link href="/about" className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-foreground/80" : "text-white/90"}`}>About</Link>
            <Link href="/contact" className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-foreground/80" : "text-white/90"}`}>Contact</Link>
            <Link 
              href="/order" 
              className={cn(
                buttonVariants(),
                "bg-[#D4AF37] hover:bg-[#b8952b] text-white rounded-full transition-transform hover:scale-105 shadow-md"
              )}
            >
              Order Now
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(true)} aria-label="Open Mobile Menu">
            <Menu className={`w-6 h-6 ${isScrolled ? "text-foreground" : "text-white drop-shadow-sm"}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-heading font-bold text-2xl text-foreground">CHAMIE CAKES</span>
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Close Mobile Menu">
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 text-xl font-medium">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link href="/gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <a href="tel:7132693696" className="flex items-center gap-3 text-primary mt-4">
                <Phone className="w-5 h-5" />
                <span>Call 713.269.3696</span>
              </a>
            </nav>
            
            <div className="mt-auto pb-8">
              <Link 
                href="/order" 
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  buttonVariants(),
                  "w-full bg-[#D4AF37] hover:bg-[#b8952b] text-white rounded-full py-7 text-lg shadow-lg flex items-center justify-center"
                )}
              >
                Start Your Order
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
