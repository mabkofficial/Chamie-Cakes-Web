"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";

export default function HeaderVertical({ className }: { className?: string }) {
  return (
    <header className={cn("fixed left-0 top-0 bottom-0 w-24 bg-white border-r border-slate-100 z-50 flex flex-col items-center py-12 justify-between", className)}>
      <Link href="/" className="font-heading text-2xl font-bold tracking-tighter -rotate-90 origin-center whitespace-nowrap mb-20">
        {SITE_CONFIG.name.split(' ')[0]}
      </Link>
      
      <nav className="flex flex-col gap-20">
        {["Gallery", "About", "Contact"].map(item => (
          <Link key={item} href={`/${item.toLowerCase()}`} className="text-[10px] font-bold uppercase tracking-[0.4em] text-black -rotate-90 origin-center whitespace-nowrap hover:italic transition-all">
            {item}
          </Link>
        ))}
      </nav>
      
      <div className="mt-auto">
         <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold text-xs">
            {SITE_CONFIG.name.charAt(0)}
         </div>
      </div>
    </header>
  );
}
