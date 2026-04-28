"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

export default function HeaderGlassBar({ className }: { className?: string }) {
  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/10 py-3", className)}>
      <div className="container mx-auto px-10 flex items-center justify-between max-w-7xl">
        <Link href="/" className="font-heading text-lg font-bold tracking-widest text-white uppercase italic">
          {SITE_CONFIG.name}
        </Link>
        <nav className="flex items-center gap-10">
          {["Gallery", "About", "Contact"].map(item => (
            <Link key={item} href={`/${item.toLowerCase()}`} className="text-[9px] font-bold uppercase tracking-[0.5em] text-white/70 hover:text-white transition-all">
              {item}
            </Link>
          ))}
          <Link href="/order" className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest border border-white/20 transition-all">
            Book
          </Link>
        </nav>
      </div>
    </header>
  );
}
