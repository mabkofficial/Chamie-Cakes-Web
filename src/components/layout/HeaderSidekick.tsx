"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

export default function HeaderSidekick({ className }: { className?: string }) {
  return (
    <header className={cn("fixed top-8 left-8 right-8 z-50 flex justify-between items-center", className)}>
      <Link href="/" className="bg-white px-6 py-3 rounded-full shadow-lg font-heading font-bold border border-slate-100">
        {SITE_CONFIG.name}
      </Link>
      
      <nav className="bg-white/70 backdrop-blur-xl px-8 py-3 rounded-full shadow-2xl border border-white/20 flex items-center gap-8">
        {["Gallery", "Story", "Contact"].map(item => (
          <Link key={item} href={`/${item.toLowerCase()}`} className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-black">
            {item}
          </Link>
        ))}
        <div className="w-[1px] h-4 bg-slate-200" />
        <Link href="/order" className="text-[10px] font-bold uppercase tracking-widest text-black">
          Order
        </Link>
      </nav>
    </header>
  );
}
