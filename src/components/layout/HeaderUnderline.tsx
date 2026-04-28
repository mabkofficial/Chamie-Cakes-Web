"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

export default function HeaderUnderline({ className }: { className?: string }) {
  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm py-6", className)}>
      <div className="container mx-auto px-10 flex items-center justify-between max-w-7xl">
        <Link href="/" className="font-heading text-xl font-bold tracking-tight text-black">
          {SITE_CONFIG.name}
        </Link>
        
        <nav className="flex items-center gap-12">
          {["Gallery", "Our Story", "Contact"].map(item => (
            <Link 
              key={item} 
              href={`/${item.toLowerCase().replace(' ', '')}`} 
              className="group relative text-[11px] font-bold uppercase tracking-[0.2em] text-black"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all group-hover:w-full" />
            </Link>
          ))}
          <Link 
            href="/order" 
            className="text-[11px] font-bold uppercase tracking-[0.2em] bg-black text-white px-8 py-3 rounded-none hover:bg-slate-800 transition-all"
          >
            Inquire
          </Link>
        </nav>
      </div>
    </header>
  );
}
