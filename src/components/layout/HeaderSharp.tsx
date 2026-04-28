"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

export default function HeaderSharp({ className }: { className?: string }) {
  return (
    <header className={cn("fixed top-8 inset-x-0 z-50 flex justify-center px-8 pointer-events-none", className)}>
      <div className="bg-white border-2 border-black w-full max-w-7xl flex items-center justify-between p-6 pointer-events-auto shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)]">
        <Link href="/" className="font-heading text-2xl font-bold tracking-tighter uppercase italic">
          {SITE_CONFIG.name}
        </Link>
        
        <nav className="flex items-center gap-10">
          {["Gallery", "Our Story", "Contact"].map(item => (
            <Link key={item} href={`/${item.toLowerCase().replace(' ', '')}`} className="text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-black hover:text-white px-4 py-2 transition-all">
              {item}
            </Link>
          ))}
          <Link href="/order" className="bg-black text-white px-10 py-3 text-[11px] font-bold uppercase tracking-widest hover:translate-y-[-2px] hover:shadow-lg transition-all">
            Order Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
