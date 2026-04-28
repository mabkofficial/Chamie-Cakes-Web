"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Phone } from "lucide-react";

export default function HeaderDoubleStack({ className }: { className?: string }) {
  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 flex flex-col", className)}>
      {/* Utility Top Bar */}
      <div className="bg-slate-50 border-b border-slate-100 py-2">
        <div className="container mx-auto px-10 max-w-7xl flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-slate-400">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><Phone className="w-3 h-3" /> {SITE_CONFIG.contact.phone}</span>
            <span>Dallas / Fort Worth</span>
          </div>
          <div className="flex gap-4">
             <a href={SITE_CONFIG.contact.instagram} className="hover:text-black">Instagram</a>
             <a href={SITE_CONFIG.contact.facebook} className="hover:text-black">Facebook</a>
          </div>
        </div>
      </div>
      
      {/* Main Nav Bar */}
      <div className="bg-white/90 backdrop-blur-md py-6 border-b border-slate-50">
        <div className="container mx-auto px-10 max-w-7xl flex justify-between items-center">
          <Link href="/" className="font-heading text-2xl font-bold tracking-tighter">
            {SITE_CONFIG.name}
          </Link>
          <nav className="flex items-center gap-12">
            {["Gallery", "Our Story", "Contact"].map(item => (
              <Link key={item} href={`/${item.toLowerCase().replace(' ', '')}`} className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 hover:text-black">
                {item}
              </Link>
            ))}
            <Link href="/order" className="bg-black text-white px-8 py-3 rounded-none text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all">
              Inquire
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
