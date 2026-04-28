"use client";

import { Phone, Mail } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Gallery", href: "/gallery" },
  { name: "Our Story", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function HeaderClassic({ className }: { className?: string }) {
  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100", className)}>
      {/* Top Bar */}
      <div className="bg-black text-[9px] text-white/60 py-2 uppercase tracking-[0.4em] font-bold text-center">
         Now Booking for {SITE_CONFIG.bookingStatus} • Dallas / Fort Worth Metroplex
      </div>

      <div className="container mx-auto px-6 py-8 flex flex-col items-center gap-8 max-w-7xl">
        {/* Centered Logo */}
        <Link href="/" className="group text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tighter text-black">
            {SITE_CONFIG.name.split(' ')[0]} <span className="text-slate-300 font-light italic">{SITE_CONFIG.name.split(' ')[1]}</span>
          </h1>
        </Link>

        {/* Centered Nav Links */}
        <nav className="flex items-center gap-16 border-t border-slate-50 pt-6 w-full justify-center">
          {navLinks.map(link => (
             <Link key={link.href} href={link.href} className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 hover:text-black transition-all">
               {link.name}
             </Link>
          ))}
          <Link 
            href="/order" 
            className="text-[11px] font-bold uppercase tracking-[0.3em] text-black border-b-2 border-black pb-1 hover:pb-2 transition-all"
          >
            Inquire Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
