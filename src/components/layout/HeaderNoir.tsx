"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

export default function HeaderNoir({ className }: { className?: string }) {
  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 bg-black py-4", className)}>
      <div className="container mx-auto px-10 flex items-center justify-between max-w-7xl">
        <Link href="/" className="font-heading text-xl font-bold tracking-tighter text-white">
          {SITE_CONFIG.name.toUpperCase()}
        </Link>
        
        <nav className="hidden md:flex items-center gap-12">
          {["Gallery", "Our Story", "Contact"].map(item => (
            <Link key={item} href={`/${item.toLowerCase().replace(' ', '')}`} className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/50 hover:text-white transition-colors">
              {item}
            </Link>
          ))}
          <Link href="/order" className="bg-white text-black px-8 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-slate-200 transition-all">
            Order
          </Link>
        </nav>
      </div>
    </header>
  );
}
